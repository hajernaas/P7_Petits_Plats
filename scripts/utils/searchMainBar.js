import { getRecettesApiData } from "../Api/api.js";
import { addTag } from "../utils/addTag.js";
import { updateFilterElements } from "./updateFilters.js";

const search_input = document.querySelector(".search-input");

//Rechercher les recettes via le champ principal et faire le mise à jour pour les tags

search_input.addEventListener("input", searchBar);
async function searchBar() {
	const recipesArray = await getRecettesApiData();
	const filtredRecipes = updateFilterElements(recipesArray);
	addTag(filtredRecipes);
}
