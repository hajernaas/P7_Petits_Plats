import { normalizeValue } from "./normalizeValue.js";
//Retourner les tags sélectionnés par categorie
export function TagsSelected(allTags, tagName) {
	return Array.from(allTags)
		.filter((tag) => tag.getAttribute("data-value") === tagName)
		.map((tagCell) => normalizeValue(tagCell.innerText));
}
// Récupérer tous les tags des ingrédients  en éliminant les doublons
export function getIngredient(arrayRecipes) {
	const ingredients = arrayRecipes.flatMap((el) =>
		el.ingredients.map((element) => element.ingredient.toLowerCase())
	);
	return Array.from(new Set(ingredients));
}
// Récupérer tous les tags des ustensiles en éliminant les doublons
export function getUstensils(arrayRecipes) {
	const ustensils = arrayRecipes
		.flatMap((el) => el.ustensils)
		.map((element) => element.toLowerCase());
	return Array.from(new Set(ustensils));
}
// Récupérer tous les tags des appareils en éliminant les doublons
export function getAppliances(arrayRecipes) {
	const appliances = arrayRecipes.map((el) => el.appliance.toLowerCase());
	return Array.from(new Set(appliances));
}
