import displayRecipes from "../pages/index.js";
import { getRecettesApiData } from "../Api/api.js";
import { getIngredient, getUstensils, addTag } from "../utils/searchTag.js";
import { normalizeValue } from "./normalizeValue.js";

const search_input = document.querySelector(".search-input");

const recipesSection = document.querySelector(".recipes-section");

const numberRecipes = document.querySelector(".recipes-count");

search_input.addEventListener("input", searchBar);

async function searchBar(e) {
	const recipesArray = await getRecettesApiData();
	recipesSection.innerHTML = "";
	//const filter = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	// const xssFilter = require("xss");
	const searchedWord = e.target.value;

	// const safeInput = xssFilter(searchedWord);
	//const safeInput = filter(searchedWord);
	// console.log("safe", safeInput);
	const searchedString = normalizeValue(searchedWord);

	if (searchedString.length >= 3) {
		const filtredRecipes = recipesArray.filter(
			(el) =>
				normalizeValue(el.name).includes(searchedString) ||
				normalizeValue(el.description).includes(searchedString) ||
				el.ingredients.some((element) =>
					normalizeValue(element.ingredient).includes(searchedString)
				)
		);

		if (filtredRecipes.length >= 1) {
			numberRecipes.innerText = `${filtredRecipes.length} recette`;
			displayRecipes(filtredRecipes);
			/*getIngredient(filtredRecipes);
			getUstensils(filtredRecipes);*/
			addTag(filtredRecipes);
		} else {
			numberRecipes.innerText = `${filtredRecipes.length} recettes`;
			const messageErreur = document.createElement("p");
			messageErreur.innerText = `Aucune recette ne contient ‘${searchedWord}’ vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
			recipesSection.appendChild(messageErreur);
		}
	} else {
		numberRecipes.innerText = `${recipesArray.length} recettes`;
		displayRecipes(recipesArray);
	}
}
