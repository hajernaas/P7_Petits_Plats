import { getRecettesApiData } from "../Api/api.js";
import { updateFilterElements } from "./updateFilters.js";
import { createTag } from "../Templates/createTag.js";
import { removeTag } from "../Templates/removeTag.js";
import { dropdownToggle } from "./dropdownMenuToggle.js";
import { normalizeValue, filter } from "./normalizeValue.js";
import { TagsSelected } from "./utils.js";

const optionsIngedients = document.querySelector("#ingredients-tags");
const optionsAppliances = document.querySelector("#appliances-tags");
const optionsUstensils = document.querySelector("#utensils-tags");

const ingredientInput = document.querySelector("#ingredient-input");
const applianceInput = document.querySelector("#appliance-input");
const utensilInput = document.querySelector("#utensil-input");

/*const ingredientList = document.querySelector(".ingredients-items");
const deviceList = document.querySelector(".appliances-items");
const ustensilList = document.querySelector(".ustensils-items");
const search_input = document.querySelector(".search-input")*/

const ingredientsSearchDropdownMenu = document.getElementById("ingredient");
const ingredientsSearch = document.getElementById("ingredient-input");

const applianceSearchDropdownMenu = document.getElementById("appliance");
const appliancesSearch = document.getElementById("appliance-input");

const utensilSearchDropdownMenu = document.getElementById("utensil");
const utensilSearch = document.getElementById("utensil-input");

//const numberRecipes = document.querySelector(".recipes-count");
//const filter = (input) => input.replace(/[<>&"/=]/g, "");
dropdownToggle();

export function searchTags() {
	//const filter = (input) => input.replace(/[<>&"/=]/g, "");
	ingredientInput.addEventListener("input", function () {
		//const tagIngredientValue = ingredientInput.value.toLowerCase();
		const valueInput = filter(ingredientInput.value);
		console.log("mmmmmmmmmmmmmmmmmm", valueInput);
		const tagIngredientValue = normalizeValue(valueInput);
		const allTagIngredients = document.querySelectorAll(".ingredient-tag");
		filterList(allTagIngredients, ".ingredients-items", tagIngredientValue);
	});

	applianceInput.addEventListener("input", function () {
		const TagApplianceValue = applianceInput.value.toLowerCase();
		const allTagAppliance = document.querySelectorAll(".appliance-tag");
		filterList(allTagAppliance, ".appliances-items", TagApplianceValue);
	});

	utensilInput.addEventListener("input", function () {
		const TagUtensilValue = utensilInput.value.toLowerCase();
		const allTagUtensils = document.querySelectorAll(".ustensil-tag");
		filterList(allTagUtensils, ".utensils-items", TagUtensilValue);
	});
}

export function filterList(list, listClass, tagValue) {
	const displayedElement = document.querySelector(listClass);
	displayedElement.classList.remove("none");

	list.forEach((item) => {
		const tagValueToCheck = normalizeValue(item.innerHTML);
		const containsTag = tagValueToCheck.includes(tagValue);
		item.style.display = containsTag ? "" : "none";
	});
}

document.addEventListener("click", (e) => {
	const resetInputIngredients = ingredientsSearchDropdownMenu.contains(e.target);
	const resetInputAppliances = applianceSearchDropdownMenu.contains(e.target);
	const resetInputUtensils = utensilSearchDropdownMenu.contains(e.target);

	const allTagIngredients = document.querySelectorAll(".ingredient-tag");
	const allTagUtensils = document.querySelectorAll(".ustensil-tag");
	const allTagAppliance = document.querySelectorAll(".appliance-tag");

	if (!resetInputIngredients) {
		ingredientsSearch.value = "";
		filterList(allTagIngredients, ".ingredients-items", "");
	}
	if (!resetInputAppliances) {
		appliancesSearch.value = "";
		filterList(allTagAppliance, ".appliances-items", "");
	}
	if (!resetInputUtensils) {
		utensilSearch.value = "";
		filterList(allTagUtensils, ".utensils-items", "");
	}
});
