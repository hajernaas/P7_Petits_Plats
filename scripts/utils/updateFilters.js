import displayRecipes from "../pages/index.js";
const numberRecipes = document.querySelector(".recipes-count");

export function normalizeValue(value) {
	return (
		value
			.toLowerCase()
			.replace(/\s/g, "")
			// Enlever les accents
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
	);
}

export function updateFilterElements(recipes) {
	const searchedString = document.getElementById("searchInput").value;
	let ingredientsArray = [];
	let appreilxArray = [];
	let ustensilesArray = [];

	console.log("updateFilterElements ", recipes);
	console.log("search string {} ", searchedString);

	const allTags = document.querySelectorAll(".tags");
	for (let i = 0; i < allTags.length; i++) {
		console.log("alltags ::: ", allTags[i].innerHTML);
	}
	ingredientsArray = Array.from(allTags)
		.filter((tag) => tag.getAttribute("data-value") === "ingredient")
		.map((ingredient) => normalizeValue(ingredient.innerText));

	appreilxArray = Array.from(allTags)
		.filter((tag) => tag.getAttribute("data-value") === "appliance")
		.map((ingredient) => normalizeValue(ingredient.innerText));

	ustensilesArray = Array.from(allTags)
		.filter((tag) => tag.getAttribute("data-value") === "ustensil")
		.map((ingredient) => normalizeValue(ingredient.innerText));

	let searchRecipes = recipes
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
			(el) => appreilxArray.length == 0 || appreilxArray.includes(normalizeValue(el.appliance))
		)
		.filter(
			(el) =>
				ustensilesArray.length == 0 ||
				ustensilesArray.every((ev) =>
					el.ustensils.some((element) => normalizeValue(element) === ev)
				)
		);

	console.log("searchRecipes  : ", searchRecipes);
	displayRecipes(searchRecipes);
	numberRecipes.innerText = `${searchRecipes.length} recette`;
	console.log("numUpdate", numberRecipes);
	return searchRecipes;
}
