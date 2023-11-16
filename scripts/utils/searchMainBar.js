import displayRecipes from "../pages/index.js";
import { getRecettesApiData } from "../Api/api.js";

const search_input = document.querySelector(".search-input");
//console.log("ddd", search_input.value);
const recipesSection = document.querySelector(".recipes-section");
const recipesArray = await getRecettesApiData();
const numberRecipes = document.querySelector(".recipes-count");
search_input.addEventListener("input", searchBar);

function searchBar(e) {
	//console.log("mmmm");
	recipesSection.innerHTML = "";

	const searchedString = e.target.value.toLowerCase();
	//.replace(/\s/g, "");
	//console.log("lll", searchedString);
	if (searchedString.length >= 3) {
		console.log("uuu", searchedString);

		const filtredRecipes = recipesArray.filter(
			(el) =>
				el.name.toLowerCase().includes(searchedString) ||
				el.description.toLowerCase().includes(searchedString) ||
				el.ingredients.some((element) => element.ingredient.toLowerCase().includes(searchedString))
		);
		//console.log("filtredRecipes", filtredRecipes);
		if (filtredRecipes.length >= 1) {
			numberRecipes.innerText = `${filtredRecipes.length} recette`;

			displayRecipes(filtredRecipes);
		}
	} else {
		numberRecipes.innerText = `${recipesArray.length} recettes`;
		displayRecipes(recipesArray);
	}
}
