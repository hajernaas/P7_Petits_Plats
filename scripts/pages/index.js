import { getRecettesApiData } from "../Api/api.js";
import cardTemplateRecipes from "../Templates/cardTemplateRecipes.js";

async function displayRecipes(recipes) {
	const recipesSection = document.querySelector(".recipes-section");
	recipes.forEach((recipe) => {
		const recipesModel = cardTemplateRecipes(recipe);
		recipesSection.appendChild(recipesModel);
	});
}

async function init() {
	const dataRecipes = await getRecettesApiData();
	displayRecipes(dataRecipes);
}

init();
