import { normalizeValue, xssFilter } from "./normalizeValue.js";

const ingredientInput = document.querySelector("#ingredient-input");
const applianceInput = document.querySelector("#appliance-input");
const utensilInput = document.querySelector("#utensil-input");

const ingredientsSearchDropdownMenu = document.getElementById("ingredient");
const ingredientsSearch = document.getElementById("ingredient-input");

const applianceSearchDropdownMenu = document.getElementById("appliance");
const appliancesSearch = document.getElementById("appliance-input");

const utensilSearchDropdownMenu = document.getElementById("utensil");
const utensilSearch = document.getElementById("utensil-input");

/**********************************************************************************************
 * Écouter un événement "input" avec addEventListener sur les champs de recherche
 * pour ingrédients -appareils -ustensiles" et appeler la fonction filterList pour la recherche
 **********************************************************************************************/

export function searchTags() {
	ingredientInput.addEventListener("input", function () {
		const valueInput = xssFilter(ingredientInput.value);
		const tagIngredientValue = normalizeValue(valueInput);
		const allTagIngredients = document.querySelectorAll(".ingredient-tag");
		filterList(allTagIngredients, tagIngredientValue);
	});

	applianceInput.addEventListener("input", function () {
		const valueInput = xssFilter(applianceInput.value);
		const TagApplianceValue = normalizeValue(valueInput);
		const allTagAppliance = document.querySelectorAll(".appliance-tag");
		filterList(allTagAppliance, TagApplianceValue);
	});

	utensilInput.addEventListener("input", function () {
		const valueInput = xssFilter(utensilInput.value);
		const TagUtensilValue = normalizeValue(valueInput);
		const allTagUtensils = document.querySelectorAll(".ustensil-tag");
		filterList(allTagUtensils, TagUtensilValue);
	});
}

//Rechercher par mot clé tous élements dans les menus déroulants
export function filterList(list, valueTag) {
	list.forEach((item) => {
		const tagValueToCheck = normalizeValue(item.innerHTML);
		const containsTag = tagValueToCheck.includes(valueTag);
		item.style.display = containsTag ? "" : "none";
	});
}

// Réinitialiser les champs de recherche pour les filtres
document.addEventListener("click", (e) => {
	const resetInputIngredients = ingredientsSearchDropdownMenu.contains(e.target);
	const resetInputAppliances = applianceSearchDropdownMenu.contains(e.target);
	const resetInputUtensils = utensilSearchDropdownMenu.contains(e.target);

	const allTagIngredients = document.querySelectorAll(".ingredient-tag");
	const allTagUtensils = document.querySelectorAll(".ustensil-tag");
	const allTagAppliance = document.querySelectorAll(".appliance-tag");

	if (!resetInputIngredients) {
		ingredientsSearch.value = "";
		filterList(allTagIngredients, "");
	}
	if (!resetInputAppliances) {
		appliancesSearch.value = "";
		filterList(allTagAppliance, "");
	}
	if (!resetInputUtensils) {
		utensilSearch.value = "";
		filterList(allTagUtensils, "");
	}
});
