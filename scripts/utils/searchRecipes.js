/*import { getRecettesApiData } from "../Api/api.js";

const inputSearch = document.querySelector(".search-input");
const recipes = await getRecettesApiData();
export function filterRecipes() {
	const searchValue = inputSearch.value.toLowerCase();
	const allTags = document.querySelectorAll(".tag");
	// Filter the recipes array based on search value and selected tags
	const filteredRecipes = recipes.filter((recipe) => {
		// Convert the recipe name, ingredients, and description to lower case
		const name = recipe.name.toLowerCase();
		const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
		const description = recipe.description.toLowerCase();

		const searchMatches =
			searchValue.length < 3 ||
			name.includes(searchValue) ||
			ingredients.some((ingredient) => ingredient.includes(searchValue)) ||
			description.includes(searchValue);

		const tagMatches = Array.from(allTags).every((tag) => {
			const categorie = tag.getAttribute("data-value");
			console.log("categorie", "data-value");
			const tagName = tag.innerText.toLowerCase();
			console.log("tagName", tagName);

			switch (categorie) {
				case "ingredient":
					return recipe.ingredients.some((i) => i.ingredient.toLowerCase() === tagName);
				case "appliance":
					return recipe.appliance.toLowerCase().includes(tagName);
				case "ustensil":
					return recipe.ustensils.some((u) => u.toLowerCase() === tagName);
				default:
					return false;
			}
		});

		return searchMatches && tagMatches;
	});

	console.log("1 filters", filteredRecipes);

	return filteredRecipes;
}
*/
