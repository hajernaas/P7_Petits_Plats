//Ce fichier contient toutes les fonctions nécessaires pour effectuer la recherche (principale et avancée)

import { getRecettesApiData } from "../Api/api.js";
import cardTemplateRecipes from "../Templates/cardTemplateRecipes.js";
import { searchTags } from "../utils/searchTag.js";
import { addTag } from "../utils/addTag.js";
import { xssFilter, normalizeValue } from "../utils/normalizeValue.js";
//Afficher les recettes dans le DOM
export default function displayRecipes(recipes) {
	const numberRecipes = document.querySelector(".recipes-count");
	const recipesSection = document.querySelector(".recipes-section");
	const searchedWord = document.getElementById("searchInput").value;
	const safeInput = xssFilter(searchedWord);
	const searchedString = normalizeValue(safeInput);

	recipesSection.innerHTML = "";

	if (recipes.length == 0) {
		numberRecipes.innerText = "0 recette";
		const messageErreur = document.createElement("p");
		messageErreur.innerText = `Aucune recette ne contient ‘${searchedString}’  vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
		recipesSection.appendChild(messageErreur);
	}
	recipes.forEach((recipe) => {
		const recipesModel = cardTemplateRecipes(recipe);
		recipesSection.appendChild(recipesModel);
	});
	numberRecipes.innerText = `${recipes.length} recettes`;
}

async function init() {
	const dataRecipes = await getRecettesApiData();
	displayRecipes(dataRecipes);
	addTag(dataRecipes);
	searchTags();
}

init();
