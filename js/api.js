// Cliente ligero para la API pública de MangaDex.
// Docs: https://api.mangadex.org/docs/

const API = 'https://api.mangadex.org';
const COVERS = 'https://uploads.mangadex.org/covers';

// ID de Berserk en MangaDex (fijo para no depender de una búsqueda).
export const BERSERK_ID = '801513ba-a712-498c-8f57-cae55b38cc92';

// Proxies CORS de respaldo. Si la petición directa a MangaDex falla por CORS
// (típico al servir desde GitHub Pages u otro dominio), se reintenta a través
// de uno de estos. Solo afecta a las peticiones JSON; las imágenes se cargan
// con <img> y no necesitan CORS.
const PROXIES = [
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
];

async function tryFetchJSON(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function getJSON(url) {
  // 1) Intento directo (funciona si MangaDex permite CORS desde este origen).
  try {
    return await tryFetchJSON(url);
  } catch (directErr) {
    // 2) Respaldo vía proxies CORS.
    for (const wrap of PROXIES) {
      try {
        return await tryFetchJSON(wrap(url));
      } catch { /* probar el siguiente */ }
    }
    throw new Error(
      'No se pudo contactar con MangaDex (directo ni por proxy). ' +
      'Puede ser CORS, un bloqueo de red o que el servicio esté caído. ' +
      `Detalle: ${directErr.message}`
    );
  }
}

// Idiomas aceptados según preferencia del usuario.
function langFilter(pref) {
  if (pref === 'any') return ['es', 'es-la'];
  if (pref === 'es') return ['es'];
  return ['es-la', 'es']; // es-la primero
}

// Devuelve metadatos del manga + url de portada.
export async function fetchManga(id = BERSERK_ID) {
  const url = `${API}/manga/${id}?includes[]=cover_art`;
  const { data } = await getJSON(url);
  const attr = data.attributes;
  const coverRel = (data.relationships || []).find((r) => r.type === 'cover_art');
  const fileName = coverRel?.attributes?.fileName;
  const cover = fileName ? `${COVERS}/${id}/${fileName}.512.jpg` : null;

  const title =
    attr.title.es || attr.title['es-la'] || attr.title.en ||
    attr.title[Object.keys(attr.title)[0]] || 'Manga';
  const desc =
    attr.description.es || attr.description['es-la'] || attr.description.en || '';

  return {
    id,
    title,
    description: desc,
    cover,
    status: attr.status,
    year: attr.year,
  };
}

// Lista TODOS los capítulos en español (paginando el feed).
export async function fetchChapters(id = BERSERK_ID, langPref = 'es-la') {
  const langs = langFilter(langPref);
  const limit = 500;
  let offset = 0;
  let total = Infinity;
  const all = [];

  while (offset < total) {
    const params = new URLSearchParams();
    langs.forEach((l) => params.append('translatedLanguage[]', l));
    ['safe', 'suggestive', 'erotica', 'pornographic'].forEach((r) =>
      params.append('contentRating[]', r)
    );
    params.append('includes[]', 'scanlation_group');
    params.set('order[chapter]', 'asc');
    params.set('order[volume]', 'asc');
    params.set('limit', limit);
    params.set('offset', offset);

    const json = await getJSON(`${API}/manga/${id}/feed?${params}`);
    total = json.total;
    offset += limit;

    for (const ch of json.data) {
      const a = ch.attributes;
      const group = (ch.relationships || []).find((r) => r.type === 'scanlation_group');
      all.push({
        id: ch.id,
        chapter: a.chapter,            // puede ser null (oneshot)
        volume: a.volume,
        title: a.title || '',
        lang: a.translatedLanguage,
        pages: a.pages,
        externalUrl: a.externalUrl,    // si no es null, no se puede leer en la app
        group: group?.attributes?.name || '',
        publishAt: a.publishAt,
      });
    }
  }

  // Dedupe por número de capítulo: nos quedamos con la primera traducción
  // (preferida según langPref) y descartamos capítulos externos sin páginas.
  const byNumber = new Map();
  for (const ch of all) {
    if (ch.externalUrl) continue;            // alojado fuera, no legible aquí
    const key = ch.chapter ?? `oneshot-${ch.id}`;
    if (!byNumber.has(key)) byNumber.set(key, ch);
  }

  const list = [...byNumber.values()];
  list.sort((a, b) => parseFloat(a.chapter ?? 0) - parseFloat(b.chapter ?? 0));
  return list;
}

// Obtiene las URLs de las páginas de un capítulo vía el servidor @Home.
export async function fetchChapterPages(chapterId, dataSaver = false) {
  const json = await getJSON(`${API}/at-home/server/${chapterId}`);
  const base = json.baseUrl;
  const hash = json.chapter.hash;
  const files = dataSaver ? json.chapter.dataSaver : json.chapter.data;
  const folder = dataSaver ? 'data-saver' : 'data';
  return files.map((f) => `${base}/${folder}/${hash}/${f}`);
}
