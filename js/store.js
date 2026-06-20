// Persistencia en localStorage: preferencias y progreso de lectura.

const PREFS_KEY = 'cdms.prefs';
const PROGRESS_KEY = 'cdms.progress';

const defaultPrefs = {
  lang: 'es-la',
  dataSaver: false,
  readMode: 'vertical', // 'vertical' | 'paged'
};

export function getPrefs() {
  try {
    return { ...defaultPrefs, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') };
  } catch {
    return { ...defaultPrefs };
  }
}

export function setPrefs(patch) {
  const next = { ...getPrefs(), ...patch };
  localStorage.setItem(PREFS_KEY, JSON.stringify(next));
  return next;
}

// progress = { read: { [chapterId]: true }, last: { chapterId, chapterNum, page } }
function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(p) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

export function isRead(chapterId) {
  return !!getProgress().read?.[chapterId];
}

export function markRead(chapterId) {
  const p = getProgress();
  p.read = p.read || {};
  p.read[chapterId] = true;
  saveProgress(p);
}

export function getLast() {
  return getProgress().last || null;
}

export function setLast(chapterId, chapterNum, page = 0) {
  const p = getProgress();
  p.last = { chapterId, chapterNum, page };
  saveProgress(p);
}

export function clearProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}
