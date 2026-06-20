import { METHODS, recipesForMethod, getMethod, getRecipe, getGrindLevel } from './data.js';
import * as store from './store.js';

const appEl = document.getElementById('app');
const topbarTitle = document.getElementById('topbarTitle');
const backBtn = document.getElementById('backBtn');
const favBtn = document.getElementById('favBtn');

/* ---------------- helpers ---------------- */

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtTime(total) {
  total = Math.max(0, Math.floor(total));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function ratioText(r) {
  const total = r.totalTime;
  return total >= 3600 ? `~${Math.round(total / 3600)} h` : fmtTime(total);
}

/* ---------------- vista: inicio (métodos) ---------------- */

function renderHome() {
  backBtn.hidden = true;
  favBtn.classList.remove('is-active');
  topbarTitle.textContent = 'Recetario de café';

  const container = el('<div></div>');
  container.appendChild(el(`
    <section class="intro">
      <h2>¿Cómo vas a preparar tu café hoy?</h2>
      <p>Elige primero tu método de extracción y te mostraré las recetas para prepararlo paso a paso.</p>
    </section>
  `));

  const grid = el('<div class="methods"></div>');
  for (const m of METHODS) {
    const count = recipesForMethod(m.id).length;
    const card = el(`
      <a class="method-card" href="#/metodo/${m.id}">
        <div class="method-card__emoji">${m.emoji}</div>
        <div class="method-card__type">${escapeHtml(m.type)}</div>
        <div class="method-card__name">${escapeHtml(m.name)}</div>
        <div class="method-card__tag">${escapeHtml(m.tagline)}</div>
        <div class="method-card__count">${count} ${count === 1 ? 'receta' : 'recetas'}</div>
      </a>
    `);
    grid.appendChild(card);
  }
  container.appendChild(grid);

  container.appendChild(el(`
    <p class="foot-note">Recetas basadas en técnicas ampliamente difundidas del mundo del café
    (James Hoffmann, Tetsu Kasuya, técnicas tradicionales). Ajusta cantidades, molienda y tiempos a tu gusto.</p>
  `));

  appEl.innerHTML = '';
  appEl.appendChild(container);
}

/* ---------------- vista: recetas de un método ---------------- */

function renderMethod(methodId) {
  const method = getMethod(methodId);
  if (!method) return renderHome();

  store.setLastMethod(methodId);
  backBtn.hidden = false;
  favBtn.classList.remove('is-active');
  topbarTitle.textContent = method.name;

  const recipes = recipesForMethod(methodId);
  const container = el('<div></div>');

  container.appendChild(el(`
    <section class="method-head">
      <div class="method-head__emoji">${method.emoji}</div>
      <div class="method-head__type">${escapeHtml(method.type)}</div>
      <h2>${escapeHtml(method.name)}</h2>
      <p>${escapeHtml(method.description)}</p>
    </section>
  `));
  container.appendChild(el(`<div class="section-title">Recetas (${recipes.length})</div>`));
  container.appendChild(recipeListEl(recipes));

  appEl.innerHTML = '';
  appEl.appendChild(container);
  window.scrollTo(0, 0);
}

function recipeListEl(recipes) {
  const ul = el('<ul class="recipes"></ul>');
  if (!recipes.length) {
    ul.appendChild(el('<li class="empty-fav">No hay recetas aquí todavía.</li>'));
    return ul;
  }
  for (const r of recipes) {
    const fav = store.isFavorite(r.id);
    const card = el(`
      <a class="recipe-card" href="#/receta/${r.id}">
        <div class="recipe-card__top">
          <div class="recipe-card__title">${escapeHtml(r.title)}</div>
          ${fav ? '<span class="recipe-card__star">★</span>' : ''}
        </div>
        <div class="recipe-card__source">${escapeHtml(r.source)}</div>
        <div class="recipe-card__chips">
          <span class="chip"><strong>${r.coffee} g</strong> café</span>
          <span class="chip"><strong>${r.water} ${r.methodId === 'espresso' ? 'g' : 'ml'}</strong> agua</span>
          <span class="chip">Ratio <strong>${escapeHtml(r.ratio)}</strong></span>
          <span class="chip">⏱ <strong>${ratioText(r)}</strong></span>
          <span class="chip">⚙ Molienda <strong>${escapeHtml(getGrindLevel(r.grindLevel).name.toLowerCase())}</strong></span>
        </div>
      </a>
    `);
    ul.appendChild(card);
  }
  return ul;
}

// PRNG con semilla para que la muestra de molienda sea estable por nivel.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Muestra "realista" de café molido: partículas dispersas cuyo tamaño y
// densidad corresponden al grosor (fino = muchas y diminutas; grueso = pocas
// y grandes). Se dibuja como SVG inline.
function grindSwatchSVG(level) {
  const cfg = {
    1: { r: 1.2, n: 460 }, 2: { r: 1.8, n: 290 }, 3: { r: 2.7, n: 180 },
    4: { r: 3.6, n: 120 }, 5: { r: 4.7, n: 80 }, 6: { r: 6.2, n: 54 },
  }[level] || { r: 3, n: 150 };
  const W = 300, H = 84;
  const rnd = mulberry32(level * 9973 + 7);
  const colors = ['#6b4a32', '#7a5638', '#5a3b27', '#8a6747', '#4e3320', '#9a784f'];
  let parts = '';
  for (let i = 0; i < cfg.n; i++) {
    const x = rnd() * W, y = rnd() * H;
    const base = cfg.r * (0.6 + rnd() * 0.8);
    const rx = (base * (0.8 + rnd() * 0.5)).toFixed(1);
    const ry = (base * (0.8 + rnd() * 0.5)).toFixed(1);
    const rot = (rnd() * 180) | 0;
    const c = colors[(rnd() * colors.length) | 0];
    parts += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx}" ry="${ry}" fill="${c}" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return `<svg class="grind__swatch" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#241710"/>${parts}</svg>`;
}

// Bloque visual de molienda: muestra realista + barra de posición en la escala.
function grindScaleEl(level) {
  const g = getGrindLevel(level);
  const box = el(`
    <div class="grind">
      <div class="grind__head">
        <span class="grind__name">⚙ Molienda: ${escapeHtml(g.name)}</span>
        <span class="grind__ref">≈ ${escapeHtml(g.ref)} · ${escapeHtml(g.microns)}</span>
      </div>
      ${grindSwatchSVG(g.level)}
      <div class="grind__scale"></div>
      <div class="grind__ends"><span>Más fino</span><span>Más grueso</span></div>
    </div>
  `);
  const scale = box.querySelector('.grind__scale');
  for (let i = 1; i <= 6; i++) {
    const size = 8 + i * 3; // crece con el grosor
    const dot = el(`<span class="grind__dot ${i === g.level ? 'is-active' : ''}"></span>`);
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    scale.appendChild(dot);
  }
  return box;
}

/* ---------------- vista: favoritos ---------------- */

function renderFavorites() {
  backBtn.hidden = false;
  favBtn.classList.add('is-active');
  topbarTitle.textContent = 'Favoritos';

  const favs = store.getFavorites();
  const recipes = [...favs].map(getRecipe).filter(Boolean);

  const container = el('<div></div>');
  container.appendChild(el('<div class="section-title">Tus recetas guardadas</div>'));
  if (!recipes.length) {
    container.appendChild(el(`<div class="empty-fav">Aún no tienes favoritos.<br>
      Toca la estrella ★ en una receta para guardarla aquí.</div>`));
  } else {
    container.appendChild(recipeListEl(recipes));
  }
  appEl.innerHTML = '';
  appEl.appendChild(container);
  window.scrollTo(0, 0);
}

/* ---------------- vista: detalle de receta + temporizador ---------------- */

let timer = null; // { id, elapsed, running }

function stopTimer() {
  if (timer && timer.id) clearInterval(timer.id);
  timer = null;
}

function renderRecipe(recipeId) {
  stopTimer();
  const r = getRecipe(recipeId);
  if (!r) return renderHome();
  const method = getMethod(r.methodId);

  backBtn.hidden = false;
  favBtn.classList.remove('is-active');
  topbarTitle.textContent = method ? method.name : 'Receta';

  const container = el('<div class="recipe"></div>');
  container.appendChild(el(`
    <div>
      <h2 class="recipe__title">${escapeHtml(r.title)}</h2>
      <p class="recipe__source">${escapeHtml(r.source)} · ${method ? escapeHtml(method.name) : ''}</p>
      <p class="recipe__summary">${escapeHtml(r.summary)}</p>
    </div>
  `));

  const waterUnit = r.methodId === 'espresso' ? 'g' : 'ml';
  container.appendChild(el(`
    <div class="specs">
      <div class="spec"><div class="spec__val">${r.coffee} g</div><div class="spec__label">Café</div></div>
      <div class="spec"><div class="spec__val">${r.water} ${waterUnit}</div><div class="spec__label">Agua</div></div>
      <div class="spec"><div class="spec__val">${escapeHtml(r.ratio)}</div><div class="spec__label">Ratio</div></div>
    </div>
  `));
  container.appendChild(el(`
    <div class="detail-rows">
      <div class="detail-row"><span>Molienda</span><span>${escapeHtml(r.grind)}</span></div>
      <div class="detail-row"><span>Temperatura</span><span>${r.temp} °C</span></div>
      <div class="detail-row"><span>Tiempo total</span><span>${ratioText(r)}</span></div>
      <div class="detail-row"><span>Dificultad</span><span>${escapeHtml(r.difficulty)}</span></div>
    </div>
  `));

  // Escala visual de molienda
  container.appendChild(grindScaleEl(r.grindLevel));

  // Favorito
  const favRow = el('<div class="btn-row" style="padding:0"></div>');
  const favToggle = el(`<button class="btn btn--ghost">${store.isFavorite(r.id) ? '★ Guardada' : '☆ Guardar'}</button>`);
  favToggle.addEventListener('click', () => {
    const now = store.toggleFavorite(r.id);
    favToggle.textContent = now ? '★ Guardada' : '☆ Guardar';
  });
  favRow.appendChild(favToggle);
  container.appendChild(favRow);

  // Temporizador (sticky)
  const clock = el(`<div class="timer__clock">00:00</div>`);
  const startBtn = el('<button class="btn btn--primary">▶ Iniciar</button>');
  const resetBtn = el('<button class="btn btn--ghost">↺ Reiniciar</button>');
  const timerBox = el('<div class="timer"></div>');
  timerBox.appendChild(clock);
  const controls = el('<div class="timer__controls"></div>');
  controls.appendChild(startBtn);
  controls.appendChild(resetBtn);
  timerBox.appendChild(controls);
  container.appendChild(timerBox);

  // Pasos
  const stepsUl = el('<ul class="steps"></ul>');
  r.steps.forEach((s, i) => {
    const li = el(`
      <li class="step" data-at="${s.at}" data-index="${i}">
        <div class="step__time">${fmtTime(s.at)}</div>
        <div class="step__body">
          <div class="step__title">${escapeHtml(s.title)}</div>
          ${s.detail ? `<div class="step__detail">${escapeHtml(s.detail)}</div>` : ''}
        </div>
      </li>
    `);
    stepsUl.appendChild(li);
  });
  container.appendChild(stepsUl);

  if (r.notes) {
    container.appendChild(el(`<div class="notes"><strong>Tip:</strong> ${escapeHtml(r.notes)}</div>`));
  }
  container.appendChild(el(`
    <div class="btn-row" style="padding:0;margin-top:8px">
      <a class="btn" href="#/metodo/${r.methodId}">← Más recetas de ${method ? escapeHtml(method.name) : 'este método'}</a>
    </div>
  `));

  appEl.innerHTML = '';
  appEl.appendChild(container);
  window.scrollTo(0, 0);

  setupTimer(r, clock, startBtn, resetBtn, stepsUl);
}

function setupTimer(recipe, clock, startBtn, resetBtn, stepsUl) {
  const stepEls = [...stepsUl.querySelectorAll('.step')];
  // El temporizador cuenta hasta el inicio del último paso + un margen.
  const lastAt = recipe.steps[recipe.steps.length - 1].at;
  const target = Math.min(recipe.totalTime, lastAt + 60) || lastAt + 60;
  let lastStepIndex = -1;

  timer = { id: null, elapsed: 0, running: false };

  function paint() {
    clock.textContent = fmtTime(timer.elapsed);
    // Paso actual = el último cuyo "at" <= elapsed
    let current = -1;
    recipe.steps.forEach((s, i) => { if (s.at <= timer.elapsed) current = i; });
    stepEls.forEach((node, i) => {
      node.classList.toggle('is-current', i === current && timer.running);
      node.classList.toggle('is-done', i < current);
    });
    // Aviso al cambiar de paso
    if (timer.running && current !== lastStepIndex && current >= 0) {
      cue();
      lastStepIndex = current;
    }
  }

  function tick() {
    timer.elapsed += 1;
    paint();
    if (timer.elapsed >= target) pause();
  }

  function start() {
    if (timer.running) return;
    timer.running = true;
    startBtn.textContent = '❚❚ Pausar';
    startBtn.onclick = pause;
    lastStepIndex = -2; // fuerza aviso del primer paso
    timer.id = setInterval(tick, 1000);
    paint();
  }
  function pause() {
    timer.running = false;
    if (timer.id) clearInterval(timer.id);
    timer.id = null;
    startBtn.textContent = '▶ Reanudar';
    startBtn.onclick = start;
    paint();
  }
  function reset() {
    pause();
    timer.elapsed = 0;
    lastStepIndex = -1;
    startBtn.textContent = '▶ Iniciar';
    startBtn.onclick = start;
    stepEls.forEach((n) => n.classList.remove('is-current', 'is-done'));
    clock.textContent = fmtTime(0);
  }

  startBtn.onclick = start;
  resetBtn.onclick = reset;
}

// Pequeño aviso sonoro + vibración al cambiar de paso.
let audioCtx = null;
function cue() {
  try {
    if (navigator.vibrate) navigator.vibrate(60);
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + 0.26);
  } catch { /* sin audio disponible */ }
}

/* ---------------- router ---------------- */

function router() {
  stopTimer();
  const hash = location.hash || '#/';
  let m;
  if ((m = hash.match(/^#\/metodo\/(.+)$/))) renderMethod(decodeURIComponent(m[1]));
  else if ((m = hash.match(/^#\/receta\/(.+)$/))) renderRecipe(decodeURIComponent(m[1]));
  else if (hash === '#/favoritos') renderFavorites();
  else renderHome();
}

window.addEventListener('hashchange', router);

backBtn.addEventListener('click', () => {
  if (history.length > 1) history.back();
  else location.hash = '#/';
});
favBtn.addEventListener('click', () => { location.hash = '#/favoritos'; });

/* ---------------- service worker ---------------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

router();
