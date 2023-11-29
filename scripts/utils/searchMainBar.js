import displayRecipes from "../pages/index.js";
import { getRecettesApiData } from "../Api/api.js";
import { addTag } from "../utils/addTag.js";
import { normalizeValue, filter } from "./normalizeValue.js";
import { updateFilterElements } from "./updateFilters.js";

const search_input = document.querySelector(".search-input");
const recipesSection = document.querySelector(".recipes-section");
const numberRecipes = document.querySelector(".recipes-count");

search_input.addEventListener("input", searchBar);

async function searchBar(e) {
	const recipesArray = await getRecettesApiData();
	//recipesSection.innerHTML = "";
	//const filter = (input) => input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	//const filter = (input) => input.replace(/[<>&"/=]/g, "");
	const searchedWord = e.target.value;
	const safeInput = filter(searchedWord);
	const searchedString = normalizeValue(safeInput);

	if (searchedString.length >= 3) {
		const filtredRecipes = updateFilterElements(recipesArray);
		addTag(filtredRecipes, searchedString);

		if (filtredRecipes.length >= 1) {
			numberRecipes.innerText = `${filtredRecipes.length} recette`;
		} else {
			numberRecipes.innerText = `${filtredRecipes.length} recettes`;
			const messageErreur = document.createElement("p");
			messageErreur.innerText = `Aucune recette ne contient ‘${searchedWord}’ vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
			recipesSection.appendChild(messageErreur);
		}
	} else if (searchedString.length == 0) {
		const filtredRecipes = updateFilterElements(recipesArray);
		addTag(filtredRecipes, searchedString);
	} else {
		numberRecipes.innerText = `${recipesArray.length} recettes`;
		displayRecipes(recipesArray);
	}
}
