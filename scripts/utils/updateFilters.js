import displayRecipes from "../pages/index.js";
import { normalizeValue, xssFilter } from "./normalizeValue.js";
import { TagsSelected } from "./utils.js";
//Méthode itérative pour la recherche principale
export function mainSearchRecipes(recipes, searchedValue) {
	const updateRecipes = [];
	const word = xssFilter(searchedValue);
	const searchedWord = normalizeValue(word);

	if (searchedWord.length < 3) {
		return recipes;
	}

	for (const recipe of recipes) {
		const name = normalizeValue(recipe.name);
		const description = normalizeValue(recipe.description);

		if (name.includes(searchedWord)) {
			updateRecipes.push(recipe);
			continue;
		}
		if (description.includes(searchedWord)) {
			updateRecipes.push(recipe);
			continue;
		}
		for (const { ingredient } of recipe.ingredients) {
			if (normalizeValue(ingredient).includes(normalizeValue(searchedWord))) {
				updateRecipes.push(recipe);
				break;
			}
		}
	}
	return updateRecipes;
}

//Mettre à jour la recherche avancée avec la recherche principale
export function updateFilterElements(recipes) {
	const searchedWord = document.getElementById("searchInput").value;
	const safeInput = xssFilter(searchedWord);
	const searchedString = normalizeValue(safeInput);

	const allTags = document.querySelectorAll(".tags");
	const ingredientsArray = TagsSelected(allTags, "ingredient");
	const appliancesArray = TagsSelected(allTags, "appliance");
	const ustensilsArray = TagsSelected(allTags, "ustensil");

	const dataRecipes = mainSearchRecipes(recipes, searchedString);

	const searchRecipes = dataRecipes
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
