import { getRecettesApiData } from "../Api/api.js";
import cardTemplateRecipes from "../Templates/cardTemplateRecipes.js";

export default async function displayRecipes(recipes) {
	const recipesSection = document.querySelector(".recipes-section");
	recipes.forEach((recipe) => {
		const recipesModel = cardTemplateRecipes(recipe);
		recipesSection.appendChild(recipesModel);
	});
}

async function init() {
	const numberRecipes = document.querySelector(".recipes-count");
	const dataRecipes = await getRecettesApiData();
	displayRecipes(dataRecipes);
	numberRecipes.innerText = `${dataRecipes.length} recettes`;
}

init();
