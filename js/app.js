import { METHODS, RECIPES, getMethod, getRecipe, getGrindLevel, GRIND_LEVELS, CALIBRATION } from './data.js';
import * as store from './store.js';
import { icon } from './icons.js';

const appEl = document.getElementById('app');
const topbarTitle = document.getElementById('topbarTitle');
const backBtn = document.getElementById('backBtn');
const favBtn = document.getElementById('favBtn');

backBtn.innerHTML = icon('back');
favBtn.innerHTML = icon('star');

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

/* ---------- recetas: integradas + propias del usuario ---------- */

function allRecipes() {
  return [...RECIPES, ...store.getUserRecipes()];
}
function recipesForMethodAll(methodId) {
  return allRecipes().filter((r) => r.methodId === methodId);
}
function getRecipeAny(id) {
  return getRecipe(id) || store.getUserRecipe(id);
}

function parseTimeStr(str) {
  if (!str) return 0;
  str = String(str).trim();
  if (str.includes(':')) {
    const [m, s2] = str.split(':');
    return (parseInt(m, 10) || 0) * 60 + (parseInt(s2, 10) || 0);
  }
  return parseInt(str, 10) || 0;
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

  container.appendChild(el(`
    <div class="btn-row" style="margin-top:6px">
      <a class="btn btn--primary" href="#/nueva">${icon('plus', { size: 18 })}Añadir mi receta</a>
    </div>
  `));
  container.appendChild(el(`
    <div class="btn-row" style="margin-top:10px">
      <a class="btn" href="#/calibracion">${icon('target', { size: 18 })}¿No te supo bien? Calíbralo por sabor</a>
    </div>
  `));

  const grid = el('<div class="methods"></div>');
  for (const m of METHODS) {
    const count = recipesForMethodAll(m.id).length;
    const card = el(`
      <a class="method-card" href="#/metodo/${m.id}">
        <div class="method-card__icon">${icon(m.icon, { size: 34 })}</div>
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

  const recipes = recipesForMethodAll(methodId);
  const container = el('<div></div>');

  container.appendChild(el(`
    <section class="method-head">
      <div class="method-head__icon">${icon(method.icon, { size: 44 })}</div>
      <div class="method-head__type">${escapeHtml(method.type)}</div>
      <h2>${escapeHtml(method.name)}</h2>
      <p>${escapeHtml(method.description)}</p>
    </section>
  `));
  container.appendChild(el(`
    <div class="btn-row">
      <a class="btn btn--primary" href="#/nueva/${method.id}">${icon('plus', { size: 18 })}Añadir receta de ${escapeHtml(method.name)}</a>
    </div>
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
          ${r.custom ? '<span class="recipe-card__mine">Mía</span>' : ''}
          ${fav ? `<span class="recipe-card__star">${icon('star-filled', { size: 16 })}</span>` : ''}
        </div>
        <div class="recipe-card__source">${escapeHtml(r.source || 'Mi receta')}</div>
        <div class="recipe-card__chips">
          <span class="chip">${icon('bean', { size: 13, cls: 'chip-ico' })}<strong>${r.coffee ? r.coffee + ' g' : '—'}</strong></span>
          <span class="chip">${icon('droplet', { size: 13, cls: 'chip-ico' })}<strong>${r.water ? r.water + (r.methodId === 'espresso' ? ' g' : ' ml') : '—'}</strong></span>
          <span class="chip">Ratio <strong>${escapeHtml(r.ratio)}</strong></span>
          <span class="chip">${icon('clock', { size: 13, cls: 'chip-ico' })}<strong>${ratioText(r)}</strong></span>
          <span class="chip">${icon('grind', { size: 13, cls: 'chip-ico' })}<strong>${escapeHtml(getGrindLevel(r.grindLevel).name.toLowerCase())}</strong></span>
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
        <span class="grind__name">${icon('grind', { size: 16, cls: 'inline-ico' })} Molienda: ${escapeHtml(g.name)}</span>
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

/* ---------------- vista: calibración por sabor ---------------- */

function renderCalibration() {
  backBtn.hidden = false;
  favBtn.classList.remove('is-active');
  topbarTitle.textContent = 'Calibrar por sabor';

  const c = CALIBRATION;
  const container = el('<div class="calib"></div>');

  container.appendChild(el(`
    <section class="intro">
      <h2>${icon('target', { size: 22, cls: 'inline-ico' })} Calibración por sabor</h2>
      <p>${escapeHtml(c.intro)}</p>
    </section>
  `));
  container.appendChild(el(`<div class="notes" style="margin:14px 18px"><strong>${escapeHtml(c.rule)}</strong></div>`));

  // Referencia rápida
  container.appendChild(el('<div class="section-title">Referencia rápida</div>'));
  const quick = el('<div class="quick-ref"></div>');
  for (const q of c.quick) {
    quick.appendChild(el(`
      <div class="quick-ref__row">
        <span class="quick-ref__taste">${escapeHtml(q.taste)}</span>
        <span class="quick-ref__arrow">${icon('arrow', { size: 16 })}</span>
        <span class="quick-ref__action">${escapeHtml(q.action)}</span>
      </div>
    `));
  }
  container.appendChild(quick);

  // Diagnóstico por extracción
  container.appendChild(el('<div class="section-title">¿Cómo sabe tu café?</div>'));
  const cards = el('<div class="calib-cards"></div>');
  for (const item of c.extraction) {
    cards.appendChild(calibCard(item));
  }
  container.appendChild(cards);

  // Concentración / fuerza
  container.appendChild(el('<div class="section-title">¿Y la intensidad?</div>'));
  const cards2 = el('<div class="calib-cards"></div>');
  for (const item of c.strength) {
    cards2.appendChild(calibCard({ ...item, tone: 'neutral', taste: null }));
  }
  container.appendChild(cards2);

  appEl.innerHTML = '';
  appEl.appendChild(container);
  window.scrollTo(0, 0);
}

function calibCard(item) {
  const tasteHtml = item.taste && item.taste.length
    ? `<div class="calib-card__tags">${item.taste.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join('')}</div>`
    : '';
  const fixes = item.fixes.map((f) => `<li>${escapeHtml(f)}</li>`).join('');
  return el(`
    <div class="calib-card calib-card--${item.tone || 'neutral'}">
      <div class="calib-card__title">${escapeHtml(item.title)}</div>
      ${tasteHtml}
      <div class="calib-card__diag">${escapeHtml(item.diagnosis)}</div>
      <ul class="calib-card__fixes">${fixes}</ul>
    </div>
  `);
}

/* ---------------- vista: favoritos ---------------- */

function renderFavorites() {
  backBtn.hidden = false;
  favBtn.classList.add('is-active');
  topbarTitle.textContent = 'Favoritos';

  const favs = store.getFavorites();
  const recipes = [...favs].map(getRecipeAny).filter(Boolean);

  const container = el('<div></div>');
  container.appendChild(el('<div class="section-title">Tus recetas guardadas</div>'));
  if (!recipes.length) {
    container.appendChild(el(`<div class="empty-fav">Aún no tienes favoritos.<br>
      Toca «Guardar» en una receta para añadirla aquí.</div>`));
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
  const r = getRecipeAny(recipeId);
  if (!r) return renderHome();
  const method = getMethod(r.methodId);

  backBtn.hidden = false;
  favBtn.classList.remove('is-active');
  topbarTitle.textContent = method ? method.name : 'Receta';

  const container = el('<div class="recipe"></div>');
  container.appendChild(el(`
    <div>
      <h2 class="recipe__title">${escapeHtml(r.title)}</h2>
      <p class="recipe__source">${escapeHtml(r.source || 'Mi receta')} · ${method ? escapeHtml(method.name) : ''}</p>
      ${r.summary ? `<p class="recipe__summary">${escapeHtml(r.summary)}</p>` : ''}
    </div>
  `));

  if (r.bean) {
    container.appendChild(el(`
      <div class="bean-box">${icon('beanbag', { size: 18, cls: 'inline-ico' })}
        <div><span class="bean-box__label">Café usado</span><div class="bean-box__val">${escapeHtml(r.bean)}</div></div>
      </div>
    `));
  }

  const waterUnit = r.methodId === 'espresso' ? 'g' : 'ml';
  const coffeeStr = r.coffee ? `${r.coffee} g` : '—';
  const waterStr = r.water ? `${r.water} ${waterUnit}` : '—';
  container.appendChild(el(`
    <div class="specs">
      <div class="spec"><div class="spec__val">${coffeeStr}</div><div class="spec__label">Café</div></div>
      <div class="spec"><div class="spec__val">${waterStr}</div><div class="spec__label">Agua</div></div>
      <div class="spec"><div class="spec__val">${escapeHtml(r.ratio || '—')}</div><div class="spec__label">Ratio</div></div>
    </div>
  `));
  container.appendChild(el(`
    <div class="detail-rows">
      <div class="detail-row"><span>Molienda</span><span>${escapeHtml(r.grind || getGrindLevel(r.grindLevel).name)}</span></div>
      <div class="detail-row"><span>Temperatura</span><span>${r.temp ? r.temp + ' °C' : '—'}</span></div>
      <div class="detail-row"><span>Tiempo total</span><span>${ratioText(r)}</span></div>
      <div class="detail-row"><span>Dificultad</span><span>${escapeHtml(r.difficulty || '—')}</span></div>
    </div>
  `));

  // Escala visual de molienda
  container.appendChild(grindScaleEl(r.grindLevel));

  // Favorito
  const favRow = el('<div class="btn-row" style="padding:0"></div>');
  const favLabel = (on) => `${icon(on ? 'star-filled' : 'star', { size: 18 })}${on ? 'Guardada' : 'Guardar'}`;
  const favToggle = el(`<button class="btn btn--ghost">${favLabel(store.isFavorite(r.id))}</button>`);
  favToggle.addEventListener('click', () => {
    favToggle.innerHTML = favLabel(store.toggleFavorite(r.id));
  });
  favRow.appendChild(favToggle);
  container.appendChild(favRow);

  const hasSteps = Array.isArray(r.steps) && r.steps.length > 0;
  let clock, startBtn, resetBtn, stepsUl;

  if (hasSteps) {
    // Temporizador (sticky)
    clock = el(`<div class="timer__clock">00:00</div>`);
    startBtn = el(`<button class="btn btn--primary">${icon('play', { size: 18 })}Iniciar</button>`);
    resetBtn = el(`<button class="btn btn--ghost">${icon('reset', { size: 18 })}Reiniciar</button>`);
    const timerBox = el('<div class="timer"></div>');
    timerBox.appendChild(clock);
    const controls = el('<div class="timer__controls"></div>');
    controls.appendChild(startBtn);
    controls.appendChild(resetBtn);
    timerBox.appendChild(controls);
    container.appendChild(timerBox);

    stepsUl = el('<ul class="steps"></ul>');
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
  }

  if (r.notes) {
    container.appendChild(el(`<div class="notes"><strong>Tip:</strong> ${escapeHtml(r.notes)}</div>`));
  }

  // Editar / borrar (solo recetas propias)
  if (r.custom) {
    const editRow = el('<div class="btn-row" style="padding:0;margin-top:8px"></div>');
    editRow.appendChild(el(`<a class="btn" href="#/editar/${r.id}">${icon('edit', { size: 18 })}Editar</a>`));
    const delBtn = el(`<button class="btn btn--danger">${icon('trash', { size: 18 })}Borrar</button>`);
    delBtn.addEventListener('click', () => {
      if (confirm('¿Borrar esta receta? No se puede deshacer.')) {
        store.deleteUserRecipe(r.id);
        location.hash = `#/metodo/${r.methodId}`;
      }
    });
    editRow.appendChild(delBtn);
    container.appendChild(editRow);
  }

  container.appendChild(el(`
    <div class="btn-row" style="padding:0;margin-top:8px">
      <a class="btn btn--primary" href="#/calibracion">${icon('target', { size: 18 })}Calibrar por sabor</a>
    </div>
  `));
  container.appendChild(el(`
    <div class="btn-row" style="padding:0;margin-top:10px">
      <a class="btn" href="#/metodo/${r.methodId}">${icon('back', { size: 18 })}Más recetas de ${method ? escapeHtml(method.name) : 'este método'}</a>
    </div>
  `));

  appEl.innerHTML = '';
  appEl.appendChild(container);
  window.scrollTo(0, 0);

  if (hasSteps) setupTimer(r, clock, startBtn, resetBtn, stepsUl);
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
    startBtn.innerHTML = `${icon('pause', { size: 18 })}Pausar`;
    startBtn.onclick = pause;
    lastStepIndex = -2; // fuerza aviso del primer paso
    timer.id = setInterval(tick, 1000);
    paint();
  }
  function pause() {
    timer.running = false;
    if (timer.id) clearInterval(timer.id);
    timer.id = null;
    startBtn.innerHTML = `${icon('play', { size: 18 })}Reanudar`;
    startBtn.onclick = start;
    paint();
  }
  function reset() {
    pause();
    timer.elapsed = 0;
    lastStepIndex = -1;
    startBtn.innerHTML = `${icon('play', { size: 18 })}Iniciar`;
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

/* ---------------- vista: formulario de receta propia ---------------- */

function renderForm({ methodId, editId } = {}) {
  stopTimer();
  backBtn.hidden = false;
  favBtn.classList.remove('is-active');

  const editing = editId ? store.getUserRecipe(editId) : null;
  topbarTitle.textContent = editing ? 'Editar receta' : 'Nueva receta';

  const preMethod = (editing && editing.methodId) || methodId || METHODS[0].id;

  const methodOptions = METHODS.map((m) =>
    `<option value="${m.id}" ${m.id === preMethod ? 'selected' : ''}>${escapeHtml(m.name)}</option>`).join('');
  const grindOptions = GRIND_LEVELS.map((g) =>
    `<option value="${g.level}" ${editing && editing.grindLevel === g.level ? 'selected' : (!editing && g.level === 3 ? 'selected' : '')}>${escapeHtml(g.name)}</option>`).join('');
  const diffOptions = ['Fácil', 'Media', 'Alta'].map((d) =>
    `<option value="${d}" ${editing && editing.difficulty === d ? 'selected' : ''}>${d}</option>`).join('');

  const v = (x) => (x == null ? '' : escapeHtml(String(x)));
  const e = editing || {};

  const form = el(`
    <form class="form" novalidate>
      <label class="field"><span>Método</span>
        <select name="method">${methodOptions}</select></label>

      <label class="field"><span>Nombre de la receta *</span>
        <input name="title" required value="${v(e.title)}" placeholder="Mi V60 de los domingos" /></label>

      <label class="field"><span>Café usado (origen / tostador / variedad)</span>
        <input name="bean" value="${v(e.bean)}" placeholder="Etiopía Yirgacheffe — Tostador X, lavado" /></label>

      <div class="field-row">
        <label class="field"><span>Café (g)</span>
          <input name="coffee" type="number" inputmode="decimal" min="0" value="${v(e.coffee)}" /></label>
        <label class="field"><span>Agua (g/ml)</span>
          <input name="water" type="number" inputmode="decimal" min="0" value="${v(e.water)}" /></label>
      </div>

      <div class="field-row">
        <label class="field"><span>Ratio</span>
          <input name="ratio" value="${v(e.ratio)}" placeholder="auto (1:16,6)" /></label>
        <label class="field"><span>Temperatura (°C)</span>
          <input name="temp" type="number" inputmode="decimal" min="0" max="100" value="${v(e.temp)}" /></label>
      </div>

      <div class="field-row">
        <label class="field"><span>Molienda</span>
          <select name="grindLevel">${grindOptions}</select></label>
        <label class="field"><span>Dificultad</span>
          <select name="difficulty">${diffOptions}</select></label>
      </div>

      <label class="field"><span>Descripción</span>
        <textarea name="summary" rows="2" placeholder="Una frase sobre esta receta…">${v(e.summary)}</textarea></label>

      <div class="section-title" style="padding-left:0">Pasos (con su tiempo)</div>
      <div class="steps-editor" id="stepList"></div>
      <button type="button" class="btn" id="addStep">${icon('plus', { size: 18 })}Añadir paso</button>

      <label class="field" style="margin-top:14px"><span>Notas / tip</span>
        <textarea name="notes" rows="2" placeholder="Trucos, ajustes, recordatorios…">${v(e.notes)}</textarea></label>

      <div class="form-error" id="formError" hidden></div>

      <div class="btn-row" style="padding:0;margin-top:16px">
        <a class="btn" href="${editing ? '#/receta/' + editing.id : '#/metodo/' + preMethod}">Cancelar</a>
        <button type="submit" class="btn btn--primary">${icon('check', { size: 18 })}Guardar</button>
      </div>
    </form>
  `);

  const stepList = form.querySelector('#stepList');

  function addStepRow(step = {}) {
    const row = el(`
      <div class="step-row">
        <input class="step-time" placeholder="0:00" value="${step.at != null ? fmtTime(step.at) : ''}" />
        <div class="step-row__body">
          <input class="step-title" placeholder="Título del paso" value="${v(step.title)}" />
          <input class="step-detail" placeholder="Detalle (opcional)" value="${v(step.detail)}" />
        </div>
        <button type="button" class="step-del" aria-label="Quitar paso">${icon('trash', { size: 18 })}</button>
      </div>
    `);
    row.querySelector('.step-del').addEventListener('click', () => row.remove());
    stepList.appendChild(row);
  }

  if (editing && Array.isArray(editing.steps) && editing.steps.length) {
    editing.steps.forEach(addStepRow);
  } else {
    addStepRow({ at: 0 });
  }
  form.querySelector('#addStep').addEventListener('click', () => addStepRow());

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const get = (name) => form.querySelector(`[name="${name}"]`).value.trim();
    const title = get('title');
    const errBox = form.querySelector('#formError');
    if (!title) {
      errBox.textContent = 'Ponle al menos un nombre a la receta.';
      errBox.hidden = false;
      return;
    }

    const steps = [...stepList.querySelectorAll('.step-row')].map((row) => ({
      at: parseTimeStr(row.querySelector('.step-time').value),
      title: row.querySelector('.step-title').value.trim(),
      detail: row.querySelector('.step-detail').value.trim(),
    })).filter((st) => st.title || st.detail);
    steps.sort((a, b) => a.at - b.at);

    const coffee = parseFloat(get('coffee')) || 0;
    const water = parseFloat(get('water')) || 0;
    let ratio = get('ratio');
    if (!ratio) {
      ratio = coffee && water ? '1:' + (water / coffee).toFixed(1).replace('.', ',') : '—';
    }
    const grindLevel = parseInt(get('grindLevel'), 10) || 3;
    const totalTime = steps.length ? steps[steps.length - 1].at + 30 : 0;

    const recipe = {
      id: editing ? editing.id : store.newRecipeId(),
      custom: true,
      methodId: get('method'),
      title,
      bean: get('bean'),
      source: get('bean') || 'Mi receta',
      coffee, water, ratio,
      grind: getGrindLevel(grindLevel).name,
      grindLevel,
      temp: parseFloat(get('temp')) || 0,
      totalTime,
      difficulty: get('difficulty') || 'Media',
      summary: get('summary'),
      steps,
      notes: get('notes'),
    };
    store.saveUserRecipe(recipe);
    location.hash = `#/receta/${recipe.id}`;
  });

  appEl.innerHTML = '';
  appEl.appendChild(form);
  window.scrollTo(0, 0);
}

/* ---------------- router ---------------- */

function router() {
  stopTimer();
  const hash = location.hash || '#/';
  let m;
  if (hash === '#/nueva') renderForm({});
  else if ((m = hash.match(/^#\/nueva\/(.+)$/))) renderForm({ methodId: decodeURIComponent(m[1]) });
  else if ((m = hash.match(/^#\/editar\/(.+)$/))) renderForm({ editId: decodeURIComponent(m[1]) });
  else if ((m = hash.match(/^#\/metodo\/(.+)$/))) renderMethod(decodeURIComponent(m[1]));
  else if ((m = hash.match(/^#\/receta\/(.+)$/))) renderRecipe(decodeURIComponent(m[1]));
  else if (hash === '#/favoritos') renderFavorites();
  else if (hash === '#/calibracion') renderCalibration();
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
