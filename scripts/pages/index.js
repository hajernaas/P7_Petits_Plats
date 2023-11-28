import { getRecettesApiData } from "../Api/api.js";
import cardTemplateRecipes from "../Templates/cardTemplateRecipes.js";
import { createTag } from "../Templates/createTag.js";
import { updateFilterElements } from "../utils/updateFilters.js";

import {
	getIngredient,
	getUstensils,
	getAppliances,
	addTag,
	searchTags,
} from "../utils/searchTag.js";
//import { dropdownToggle } from "../utils/dropdownMenuToggle.js";

export default function displayRecipes(recipes) {
	const recipesSection = document.querySelector(".recipes-section");
	recipesSection.innerHTML = "";
	recipes.forEach((recipe) => {
		const recipesModel = cardTemplateRecipes(recipe);

		recipesSection.appendChild(recipesModel);
	});
}

async function init() {
	const numberRecipes = document.querySelector(".recipes-count");
	const dataRecipes = await getRecettesApiData();
	numberRecipes.innerText = `${dataRecipes.length} recettes`;
	displayRecipes(dataRecipes);
	/*getIngredient(dataRecipes);
	console.log("ttt", getIngredient(dataRecipes));
	getUstensils(dataRecipes);
	console.log("uuu", getUstensils(dataRecipes));
	getAppliances(dataRecipes);
	console.log("ooo", getAppliances(dataRecipes));*/
	addTag(dataRecipes, "");
	searchTags();
}

init();
