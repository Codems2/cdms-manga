import * as api from './api.js';
import * as store from './store.js';

const appEl = document.getElementById('app');
const topbar = document.getElementById('topbar');
const topbarTitle = document.getElementById('topbarTitle');
const backBtn = document.getElementById('backBtn');
const settingsBtn = document.getElementById('settingsBtn');

// Estado en memoria (cache de la sesión).
const state = {
  manga: null,
  chapters: null,
  chaptersLang: null, // idioma con el que se cargaron los capítulos
};

/* ---------------- Helpers de UI ---------------- */

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function showLoader(text = 'Cargando…') {
  appEl.innerHTML = `<div class="loader"><div class="spinner"></div><p>${text}</p></div>`;
}

function showError(message, retryHash) {
  appEl.innerHTML = `
    <div class="notice">
      <p>${message}</p>
      <a class="btn btn--primary" href="${retryHash || location.hash || '#/'}">Reintentar</a>
    </div>`;
}

function chapterLabel(ch) {
  if (ch.chapter == null) return ch.title || 'Oneshot';
  let label = `Capítulo ${ch.chapter}`;
  if (ch.title) label += ` — ${ch.title}`;
  return label;
}

/* ---------------- Carga de datos ---------------- */

async function ensureManga() {
  if (!state.manga) state.manga = await api.fetchManga();
  return state.manga;
}

async function ensureChapters() {
  const lang = store.getPrefs().lang;
  if (!state.chapters || state.chaptersLang !== lang) {
    state.chapters = await api.fetchChapters(api.BERSERK_ID, lang);
    state.chaptersLang = lang;
  }
  return state.chapters;
}

/* ---------------- Vista: lista de capítulos ---------------- */

let sortAsc = true;
let searchTerm = '';

async function renderHome() {
  backBtn.hidden = true;
  showLoader('Buscando capítulos…');
  topbar.classList.remove('topbar--hidden');

  let manga, chapters;
  try {
    [manga, chapters] = await Promise.all([ensureManga(), ensureChapters()]);
  } catch (e) {
    showError('No se pudo conectar con MangaDex. Revisa tu conexión.');
    return;
  }

  topbarTitle.textContent = manga.title;

  if (!chapters.length) {
    appEl.innerHTML = `<div class="notice"><p>No se encontraron capítulos en este idioma.
      Prueba con otro idioma en ⚙ Ajustes.</p></div>`;
    return;
  }

  const last = store.getLast();
  const container = el('<div></div>');

  // Hero
  const hero = el(`
    <section class="hero">
      ${manga.cover ? `<div class="hero__bg" style="background-image:url('${manga.cover}')"></div>` : ''}
      ${manga.cover ? `<img class="hero__cover" src="${manga.cover}" alt="Portada de ${manga.title}" />` : ''}
      <div class="hero__info">
        <h2 class="hero__title">${manga.title}</h2>
        <p class="hero__meta">${manga.year || ''} · ${chapters.length} capítulos · ${statusLabel(manga.status)}</p>
        <p class="hero__desc">${escapeHtml(manga.description)}</p>
      </div>
    </section>
  `);
  container.appendChild(hero);

  // Continuar leyendo
  if (last) {
    const cont = el(`<button class="continue">▶ Continuar — Cap. ${last.chapterNum ?? ''}</button>`);
    cont.addEventListener('click', () => { location.hash = `#/leer/${last.chapterId}`; });
    container.appendChild(cont);
  }

  // Cabecera de lista + buscador
  const head = el(`
    <div class="list-head">
      <h2>Capítulos</h2>
      <button class="sort-btn" id="sortBtn">${sortAsc ? '↑ Antiguos' : '↓ Recientes'}</button>
    </div>
  `);
  container.appendChild(head);

  const search = el(`<input class="search" type="search" inputmode="decimal"
    placeholder="Buscar capítulo (nº o título)…" value="${escapeAttr(searchTerm)}" />`);
  container.appendChild(search);

  const ul = el('<ul class="chapters" id="chapterList"></ul>');
  container.appendChild(ul);

  appEl.innerHTML = '';
  appEl.appendChild(container);

  const paint = () => paintChapters(ul, chapters);
  paint();

  head.querySelector('#sortBtn').addEventListener('click', (ev) => {
    sortAsc = !sortAsc;
    ev.target.textContent = sortAsc ? '↑ Antiguos' : '↓ Recientes';
    paint();
  });
  search.addEventListener('input', (ev) => {
    searchTerm = ev.target.value.trim().toLowerCase();
    paint();
  });
}

function paintChapters(ul, chapters) {
  let list = [...chapters];
  if (!sortAsc) list.reverse();
  if (searchTerm) {
    list = list.filter((ch) =>
      String(ch.chapter ?? '').includes(searchTerm) ||
      (ch.title || '').toLowerCase().includes(searchTerm)
    );
  }

  ul.innerHTML = '';
  if (!list.length) {
    ul.appendChild(el('<li class="notice">Sin resultados.</li>'));
    return;
  }
  const frag = document.createDocumentFragment();
  for (const ch of list) {
    const read = store.isRead(ch.id);
    const li = el(`
      <a class="chapter ${read ? 'chapter--read' : ''}" href="#/leer/${ch.id}">
        <div class="chapter__main">
          <div class="chapter__title">${escapeHtml(chapterLabel(ch))}</div>
          <div class="chapter__sub">${ch.group ? escapeHtml(ch.group) + ' · ' : ''}${ch.lang}${ch.pages ? ' · ' + ch.pages + ' pág.' : ''}</div>
        </div>
        ${read ? '<span class="chapter__check">✓</span>' : ''}
      </a>
    `);
    frag.appendChild(li);
  }
  ul.appendChild(frag);
}

function statusLabel(s) {
  return { ongoing: 'En curso', completed: 'Completo', hiatus: 'En pausa', cancelled: 'Cancelado' }[s] || '';
}

/* ---------------- Vista: lector ---------------- */

let scrollHandler = null;
let keyHandler = null;

async function renderReader(chapterId) {
  detachReaderHandlers();
  backBtn.hidden = false;
  topbar.classList.remove('topbar--hidden');
  showLoader('Cargando páginas…');

  const prefs = store.getPrefs();

  // Asegura la lista para conocer vecinos y número de capítulo.
  let chapters;
  try {
    chapters = await ensureChapters();
  } catch {
    chapters = state.chapters || [];
  }
  const idx = chapters.findIndex((c) => c.id === chapterId);
  const current = chapters[idx];
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null;

  topbarTitle.textContent = current ? `Cap. ${current.chapter ?? ''}` : 'Lectura';

  let pages;
  try {
    pages = await api.fetchChapterPages(chapterId, prefs.dataSaver);
  } catch (e) {
    showError('No se pudieron cargar las páginas de este capítulo.');
    return;
  }
  if (!pages.length) {
    showError('Este capítulo no tiene páginas legibles en la app.');
    return;
  }

  store.setLast(chapterId, current?.chapter, 0);

  const paged = prefs.readMode === 'paged';
  const reader = el(`<div class="reader ${paged ? 'reader--paged' : ''}"></div>`);
  const pagesWrap = el('<div class="reader__pages"></div>');
  pages.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Página ${i + 1}`;
    img.loading = i < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.dataset.page = i;
    if (paged && i === 0) img.classList.add('is-current');
    img.addEventListener('error', () => { img.alt = `⚠ Página ${i + 1} no cargó`; });
    pagesWrap.appendChild(img);
  });
  reader.appendChild(pagesWrap);

  // Footer con navegación entre capítulos
  const footer = el(`
    <div class="reader__footer">
      <button class="btn" id="prevCh" ${prev ? '' : 'disabled'}>‹ Anterior</button>
      <a class="btn btn--ghost" href="#/">Capítulos</a>
      <button class="btn btn--primary" id="nextCh" ${next ? '' : 'disabled'}>Siguiente ›</button>
    </div>
  `);
  reader.appendChild(footer);

  appEl.innerHTML = '';
  appEl.appendChild(reader);

  const indicator = el(`<div class="page-indicator">1 / ${pages.length}</div>`);
  document.body.appendChild(indicator);

  window.scrollTo(0, 0);

  if (prev) footer.querySelector('#prevCh').addEventListener('click', () => goTo(prev.id));
  if (next) footer.querySelector('#nextCh').addEventListener('click', () => goTo(next.id));

  function goTo(id) {
    cleanupIndicator();
    location.hash = `#/leer/${id}`;
  }
  function cleanupIndicator() { indicator.remove(); }

  if (paged) {
    setupPagedMode(reader, pagesWrap, pages, indicator, current, next);
  } else {
    setupVerticalMode(pagesWrap, pages, indicator, chapterId, current, cleanupIndicator);
  }
}

function setupVerticalMode(pagesWrap, pages, indicator, chapterId, current, cleanupIndicator) {
  let lastShownTop = 0;
  let ticking = false;
  let markedRead = false;

  scrollHandler = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const imgs = pagesWrap.querySelectorAll('img');
      const viewMid = window.scrollY + window.innerHeight / 2;
      let cur = 1;
      imgs.forEach((img, i) => {
        if (img.offsetTop <= viewMid) cur = i + 1;
      });
      indicator.textContent = `${cur} / ${pages.length}`;

      // Auto-ocultar topbar al hacer scroll hacia abajo.
      const y = window.scrollY;
      if (y > lastShownTop + 8 && y > 80) topbar.classList.add('topbar--hidden');
      else if (y < lastShownTop - 8) topbar.classList.remove('topbar--hidden');
      lastShownTop = y;

      // Marca como leído al llegar al final.
      if (!markedRead && cur >= pages.length) {
        markedRead = true;
        store.markRead(chapterId);
      }
    });
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
}

function setupPagedMode(reader, pagesWrap, pages, indicator, current, next) {
  let page = 0;
  const imgs = pagesWrap.querySelectorAll('img');

  const show = (n) => {
    page = Math.max(0, Math.min(pages.length - 1, n));
    imgs.forEach((img, i) => img.classList.toggle('is-current', i === page));
    indicator.textContent = `${page + 1} / ${pages.length}`;
    window.scrollTo(0, 0);
    if (page === pages.length - 1 && current) store.markRead(current.id);
  };

  // Zonas táctiles izquierda/derecha.
  const left = el('<div class="page-tap page-tap--left"></div>');
  const right = el('<div class="page-tap page-tap--right"></div>');
  left.addEventListener('click', () => { if (page === 0) return; show(page - 1); });
  right.addEventListener('click', () => {
    if (page < pages.length - 1) show(page + 1);
    else if (next) location.hash = `#/leer/${next.id}`;
  });
  reader.appendChild(left);
  reader.appendChild(right);

  keyHandler = (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') show(page + 1);
    else if (e.key === 'ArrowLeft') show(page - 1);
  };
  window.addEventListener('keydown', keyHandler);

  show(0);
}

function detachReaderHandlers() {
  if (scrollHandler) { window.removeEventListener('scroll', scrollHandler); scrollHandler = null; }
  if (keyHandler) { window.removeEventListener('keydown', keyHandler); keyHandler = null; }
  topbar.classList.remove('topbar--hidden');
  document.querySelectorAll('.page-indicator').forEach((n) => n.remove());
}

/* ---------------- Escapes ---------------- */

function escapeHtml(str = '') {
  return str.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(str = '') { return escapeHtml(str); }

/* ---------------- Router ---------------- */

function router() {
  detachReaderHandlers();
  const hash = location.hash || '#/';
  const readerMatch = hash.match(/^#\/leer\/(.+)$/);
  if (readerMatch) {
    renderReader(decodeURIComponent(readerMatch[1]));
  } else {
    renderHome();
  }
  document.body.scrollTop = 0;
}

window.addEventListener('hashchange', router);

/* ---------------- Topbar acciones ---------------- */

backBtn.addEventListener('click', () => {
  if (history.length > 1) history.back();
  else location.hash = '#/';
});

/* ---------------- Panel de ajustes ---------------- */

const sheet = document.getElementById('settingsSheet');
const langSelect = document.getElementById('langSelect');
const dataSaverToggle = document.getElementById('dataSaverToggle');
const readModeSelect = document.getElementById('readModeSelect');
const clearProgressBtn = document.getElementById('clearProgressBtn');

function openSheet() {
  const p = store.getPrefs();
  langSelect.value = p.lang;
  dataSaverToggle.checked = p.dataSaver;
  readModeSelect.value = p.readMode;
  sheet.hidden = false;
}
function closeSheet() { sheet.hidden = true; }

settingsBtn.addEventListener('click', openSheet);
sheet.querySelector('[data-close-sheet]').addEventListener('click', closeSheet);

langSelect.addEventListener('change', () => {
  store.setPrefs({ lang: langSelect.value });
  state.chapters = null; // forzar recarga
  if ((location.hash || '#/') === '#/') router();
});
dataSaverToggle.addEventListener('change', () =>
  store.setPrefs({ dataSaver: dataSaverToggle.checked }));
readModeSelect.addEventListener('change', () =>
  store.setPrefs({ readMode: readModeSelect.value }));
clearProgressBtn.addEventListener('click', () => {
  store.clearProgress();
  closeSheet();
  router();
});

/* ---------------- Service Worker (PWA) ---------------- */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ---------------- Arranque ---------------- */

router();
