// Iconos SVG de línea (estilo consistente, usan currentColor).
// Uso: icon('v60', { size: 28, cls: 'foo' })

const PATHS = {
  // --- UI ---
  back: '<polyline points="15 18 9 12 15 6"/>',
  star: '<path d="M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.4 9.3l5.8-.8z"/>',
  'star-filled': '<path d="M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.4 9.3l5.8-.8z" fill="currentColor" stroke="none"/>',
  play: '<polygon points="7 4 20 12 7 20" fill="currentColor" stroke="none"/>',
  pause: '<rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/>',
  reset: '<polyline points="3 5 3 11 9 11"/><path d="M4.5 15a8 8 0 1 0 1-8.5L3 11"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
  grind: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="9" cy="7" r="2" fill="var(--bg-elevated)"/><circle cx="15" cy="12" r="2" fill="var(--bg-elevated)"/><circle cx="8" cy="17" r="2" fill="var(--bg-elevated)"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><polyline points="12 7.5 12 12 15.5 13.5"/>',
  droplet: '<path d="M12 3.5s6 6 6 9.8a6 6 0 0 1-12 0c0-3.8 6-9.8 6-9.8z"/>',
  bean: '<ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(40 12 12)"/><path d="M8.8 8.8c2.2 2.2 4.2 4.2 6.4 6.4"/>',
  arrow: '<line x1="4" y1="12" x2="18" y2="12"/><polyline points="12 6 18 12 12 18"/>',
  thermo: '<path d="M14 14.5V5.5a2 2 0 0 0-4 0v9a3.5 3.5 0 1 0 4 0z"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  trash: '<polyline points="3 6 21 6"/><path d="M19 6l-1 13.5A2 2 0 0 1 16 21H8a2 2 0 0 1-2-1.5L5 6"/><path d="M10 10.5v6"/><path d="M14 10.5v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  check: '<polyline points="4 12 10 18 20 6"/>',
  beanbag: '<path d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',

  // --- métodos de extracción ---
  v60: '<path d="M5 6.5h14l-5.5 8h-3z"/><line x1="12" y1="14.5" x2="12" y2="17"/><line x1="8.5" y1="18.5" x2="15.5" y2="18.5"/>',
  aeropress: '<rect x="8" y="7.5" width="8" height="12" rx="1.2"/><line x1="7" y1="7.5" x2="17" y2="7.5"/><rect x="10" y="3.5" width="4" height="4" rx="1"/>',
  press: '<rect x="7.5" y="5" width="9" height="15" rx="1.2"/><line x1="12" y1="5" x2="12" y2="2"/><line x1="9" y1="2" x2="15" y2="2"/><line x1="8.5" y1="9" x2="15.5" y2="9"/><path d="M16.5 8h2.5v4"/>',
  chemex: '<path d="M7 4h10l-3.2 7.5 3.2 8.5H7l3.2-8.5z"/><line x1="9.2" y1="11" x2="14.8" y2="11"/>',
  moka: '<path d="M6.5 20l1.5-6.5h8L17.5 20z"/><path d="M8.2 13.5l.8-6h6l.8 6"/><line x1="9" y1="7.5" x2="15" y2="7.5"/><path d="M16 9.5h3v4"/>',
  espresso: '<path d="M5 11h11v3.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 11.8h2.5a2 2 0 0 1 0 4H16"/><path d="M8.5 7.5c0-1 1-1.2 1-2.5"/><path d="M12 7.5c0-1 1-1.2 1-2.5"/>',
  coldbrew: '<path d="M7.5 6.5h9l-1 13.5h-7z"/><line x1="14.5" y1="3" x2="12.5" y2="12"/><rect x="9.3" y="9.5" width="3" height="3" transform="rotate(8 9.3 9.5)"/>',
  turkish: '<path d="M6.5 9h8.5v4a4 4 0 0 1-4 4H10.5a4 4 0 0 1-4-4z"/><line x1="15" y1="10.5" x2="21.5" y2="8.5"/><path d="M8.5 9V6.5"/>',
  siphon: '<circle cx="12" cy="6.5" r="3"/><line x1="12" y1="9.5" x2="12" y2="13"/><path d="M7.5 19.5a4.5 4.5 0 0 0 9 0c0-2.2-2-3.5-4.5-3.5s-4.5 1.3-4.5 3.5z"/>',
  kalita: '<path d="M6 7h12l-2.2 7.5H8.2z"/><line x1="8" y1="9.7" x2="16" y2="9.7"/><line x1="8.6" y1="14.5" x2="15.4" y2="14.5"/><line x1="9.2" y1="17.5" x2="14.8" y2="17.5"/>',
  clever: '<path d="M6.5 7h11l-1.3 8.5h-8.4z"/><line x1="8" y1="17.5" x2="16" y2="17.5"/><path d="M11 19h2v2h-2z"/><path d="M17.4 9h1.6"/>',
  phin: '<rect x="8" y="6.5" width="8" height="6" rx="1"/><rect x="9" y="4.3" width="6" height="2.2" rx="1"/><path d="M7 13.5h10l-1 5.5H8z"/>',
  goteo: '<path d="M8.5 3h7l-1 3.5 1.8 3v8.5a2 2 0 0 1-2 2H9.7a2 2 0 0 1-2-2V9.5l1.8-3z"/><line x1="9.2" y1="13" x2="14.8" y2="13"/>',
  percolador: '<path d="M7 8.5h10v8a3.5 3.5 0 0 1-3.5 3.5h-3A3.5 3.5 0 0 1 7 16.5z"/><path d="M17 11h2.4"/><circle cx="12" cy="5.4" r="1.4"/><line x1="12" y1="6.8" x2="12" y2="8.5"/>',
};

export function icon(name, { size = 24, cls = '' } = {}) {
  const inner = PATHS[name] || PATHS.bean;
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}
