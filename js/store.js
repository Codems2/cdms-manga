// Persistencia ligera en localStorage: favoritos y último método visto.

const FAV_KEY = 'cafe.favs';
const LAST_KEY = 'cafe.lastMethod';

export function getFavorites() {
  try {
    return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

export function isFavorite(recipeId) {
  return getFavorites().has(recipeId);
}

export function toggleFavorite(recipeId) {
  const favs = getFavorites();
  if (favs.has(recipeId)) favs.delete(recipeId);
  else favs.add(recipeId);
  localStorage.setItem(FAV_KEY, JSON.stringify([...favs]));
  return favs.has(recipeId);
}

export function getLastMethod() {
  return localStorage.getItem(LAST_KEY);
}

export function setLastMethod(id) {
  localStorage.setItem(LAST_KEY, id);
}
