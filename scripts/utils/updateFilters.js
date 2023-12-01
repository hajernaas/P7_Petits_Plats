import displayRecipes from "../pages/index.js";
import { normalizeValue, filter } from "./normalizeValue.js";
import { TagsSelected } from "./utils.js";

//mettre à jour la recherche avanccée avec la recherche principale
export function updateFilterElements(recipes) {
	const searchedWord = document.getElementById("searchInput").value;
	const safeInput = filter(searchedWord);
	const searchedString = normalizeValue(safeInput);

	const allTags = document.querySelectorAll(".tags");
	const ingredientsArray = TagsSelected(allTags, "ingredient");
	const appliancesArray = TagsSelected(allTags, "appliance");
	const ustensilsArray = TagsSelected(allTags, "ustensil");

	const searchRecipes = recipes
		.filter(
			(el) =>
				searchedString.length < 3 ||
				normalizeValue(el.name).includes(normalizeValue(searchedString)) ||
				normalizeValue(el.description).includes(normalizeValue(searchedString)) ||
				el.ingredients.some((element) =>
					normalizeValue(element.ingredient).includes(normalizeValue(searchedString))
				)
		)
		.filter(
			(el) =>
				ingredientsArray.length == 0 ||
				ingredientsArray.every((ev) =>
					el.ingredients.some((element) => normalizeValue(element.ingredient) === ev)
				)
		)
		.filter(
			(el) => appliancesArray.length == 0 || appliancesArray.includes(normalizeValue(el.appliance))
		)
		.filter(
			(el) =>
				ustensilsArray.length == 0 ||
				ustensilsArray.every((ev) => el.ustensils.some((element) => normalizeValue(element) === ev))
		);

	displayRecipes(searchRecipes);
	return searchRecipes;
}
