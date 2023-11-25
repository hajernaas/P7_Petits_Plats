/*import { getRecettesApiData } from "../Api/api.js";

import { normalizeValue } from "./normalizeValue.js";

import { searchRecipesMainBar } from "./searchMainBar.js";
import displayRecipes from "../pages/index.js";*/
import { getRecettesApiData } from "../Api/api.js";
import { updateFilterElements } from "./updateFilters.js";
import { createTag } from "../Templates/createTag.js";
import { dropdownToggle } from "./dropdownMenuToggle.js";

const optionsIngedients = document.querySelector("#ingredients-tags");
const optionsAppliances = document.querySelector("#appliances-tags");
const optionsUstensils = document.querySelector("#utensils-tags");

const ingredientInput = document.querySelector("#ingredient-input");
const applianceInput = document.querySelector("#appliance-input");
const utensilInput = document.querySelector("#utensil-input");

const ingredientList = document.querySelector(".ingredients-items");
const deviceList = document.querySelector(".appliances-items");
const ustensilList = document.querySelector(".ustensils-items");

dropdownToggle();

/*const tagSection = document.querySelector(".tag-section");
const tag = document.createElement("div");*/

/*const tagElements = document.querySelectorAll(".ingredient-tags");
console.log("pppp");
for (let i = 0; i < tagElements.length; i++) {
	console.log("tagElements", tagElements[i].innerHTML);
}
*/

export function getIngredient(arrayRecipes) {
	//const recipes = await getRecettesApiData();
	console.log("recipes", arrayRecipes);
	const ingredients = arrayRecipes.flatMap((el) =>
		el.ingredients.map((element) => element.ingredient.toLowerCase())
	);
	return Array.from(new Set(ingredients));
}

export function getUstensils(arrayRecipes) {
	const ustensils = arrayRecipes
		.flatMap((el) => el.ustensils)
		.map((element) => element.toLowerCase());
	return Array.from(new Set(ustensils));
}

export function getAppliances(arrayRecipes) {
	const appliances = arrayRecipes.map((el) => el.appliance.toLowerCase());
	return Array.from(new Set(appliances));
}

export async function addTag(arrayRecipes, searchInput) {
	const arrayIngredient = getIngredient(arrayRecipes);
	const arrayUstensils = getUstensils(arrayRecipes);
	const arrayAppliances = getAppliances(arrayRecipes);
	console.log("arrayIngredient", arrayIngredient);
	console.log("arrayUstensils", arrayUstensils);
	console.log("arrayAppliances", arrayAppliances);

	optionsIngedients.innerHTML = "";
	optionsUstensils.innerHTML = "";
	optionsAppliances.innerHTML = "";

	arrayIngredient.forEach((ingredient) => {
		let li = `<li class="ingredient-tag tag" data-value="ingredient">${ingredient} </li>`;
		optionsIngedients.insertAdjacentHTML("beforeend", li);
	});

	arrayUstensils.forEach((ustensil) => {
		let li = `<li  class="ustensil-tag tag" data-value="ustensil">${ustensil} </li>`;
		optionsUstensils.insertAdjacentHTML("beforeend", li);
	});

	arrayAppliances.forEach((appliance) => {
		let li = `<li  class="appliance-tag tag" data-value="appliance">${appliance} </li>`;
		optionsAppliances.insertAdjacentHTML("beforeend", li);
	});

	const tagElements = document.querySelectorAll(".tag");
	const recipesArray = await getRecettesApiData();
	tagElements.forEach((el) => {
		el.addEventListener("click", () => {
			console.log("tags");
			createTag(el);

			let filtredRecipes = updateFilterElements(recipesArray, searchInput);
			console.log("display", filtredRecipes);
			console.log("filtredRecipes : ", filtredRecipes);
			addTag(filtredRecipes, searchInput);

			const close = document.querySelectorAll(".close");
			close.forEach((btn) => {
				btn.addEventListener("click", (e) => {
					el.style.display = "block";
					e.target.closest("div").remove();
					console.log("tag1");
					//const recipesArray = await getRecettesApiData();
					let filtredRecipes = updateFilterElements(recipesArray, searchInput);

					console.log("close filtredRecipes: ", filtredRecipes);
					addTag(filtredRecipes, searchInput);
				});
			});
		});
	});
}

//rechercher des mot clés dans les menus ingédients,
export function searchTags() {
	ingredientInput.addEventListener("input", function () {
		const tagIngredientValue = ingredientInput.value.toLowerCase();
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

	function filterList(list, listClass, tagValue) {
		const displayedElement = document.querySelector(listClass);
		displayedElement.classList.remove("none");

		list.forEach((item) => {
			const tagValueToCheck = item.innerHTML.toLowerCase();
			console.log("valueTochek", tagValueToCheck);

			const containsTag = tagValueToCheck.includes(tagValue);

			item.style.display = containsTag ? "" : "none";
		});
	}
}
