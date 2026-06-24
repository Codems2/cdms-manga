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

/* ---------- Recetas propias del usuario ---------- */

const USER_KEY = 'cafe.userRecipes';

export function getUserRecipes() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getUserRecipe(id) {
  return getUserRecipes().find((r) => r.id === id) || null;
}

export function saveUserRecipe(recipe) {
  const list = getUserRecipes();
  const idx = list.findIndex((r) => r.id === recipe.id);
  if (idx >= 0) list[idx] = recipe;
  else list.push(recipe);
  localStorage.setItem(USER_KEY, JSON.stringify(list));
  return recipe;
}

export function deleteUserRecipe(id) {
  localStorage.setItem(USER_KEY, JSON.stringify(getUserRecipes().filter((r) => r.id !== id)));
}

export function newRecipeId() {
  return 'user-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
}
