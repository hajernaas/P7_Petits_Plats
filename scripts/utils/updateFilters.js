import displayRecipes from "../pages/index.js";

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

export function updateFilterElements(recipes, searchedString) {
	let ingredientsArray = [];
	let appreilxArray = [];
	let ustensilesArray = [];

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
				normalizeValue(el.name).includes(normalizeValue(searchedString)) ||
				normalizeValue(el.description).includes(normalizeValue(searchedString)) ||
				el.ingredients.some((element) =>
					normalizeValue(element.ingredient).includes(normalizeValue(searchedString))
				)
		)
		.filter((el) =>
			el.ingredients.some(
				(element) =>
					ingredientsArray.length == 0 ||
					ingredientsArray.includes(normalizeValue(element.ingredient))
			)
		)
		.filter(
			(el) => appreilxArray.length == 0 || appreilxArray.includes(normalizeValue(el.appliance))
		)
		.filter(
			(el) =>
				ustensilesArray.length == 0 ||
				el.ustensils.some((element) => ustensilesArray.includes(normalizeValue(element)))
		);

	console.log("searchRecipes  : ", searchRecipes);
	displayRecipes(searchRecipes);

	return searchRecipes;
}
