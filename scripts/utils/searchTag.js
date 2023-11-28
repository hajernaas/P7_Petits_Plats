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
const tagsList = document.querySelector(".tag");

const ingredientInput = document.querySelector("#ingredient-input");
const applianceInput = document.querySelector("#appliance-input");
const utensilInput = document.querySelector("#utensil-input");

const ingredientList = document.querySelector(".ingredients-items");
const deviceList = document.querySelector(".appliances-items");
const ustensilList = document.querySelector(".ustensils-items");
const search_input = document.querySelector(".search-input");

const ingredientsSearchDropdownMenu = document.getElementById("ingredient");
const ingredientsSearch = document.getElementById("ingredient-input");

const applianceSearchDropdownMenu = document.getElementById("appliance");
const appliancesSearch = document.getElementById("appliance-input");

const utensilSearchDropdownMenu = document.getElementById("utensil");
const utensilSearch = document.getElementById("utensil-input");

const numberRecipes = document.querySelector(".recipes-count");
dropdownToggle();

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
		const cls = ["ingredient-tag", "tag"];
		const itemIngredient = document.createElement("li");
		itemIngredient.classList.add(...cls);
		itemIngredient.setAttribute("data-value", "ingredient");
		itemIngredient.innerText = ingredient;
		optionsIngedients.appendChild(itemIngredient);
		/*const li = `<li class="ingredient-tag tag  " data-value="ingredient">${ingredient} </li>`;
		optionsIngedients.insertAdjacentHTML("beforeend", li);*/
	});

	arrayUstensils.forEach((ustensil) => {
		const cls = ["ustensil-tag", "tag"];
		const itemUstensils = document.createElement("li");
		itemUstensils.classList.add(...cls);
		itemUstensils.setAttribute("data-value", "ustensil");
		itemUstensils.innerText = ustensil;
		optionsUstensils.appendChild(itemUstensils);

		/*const li = `<li  class="ustensil-tag tag " data-value="ustensil">${ustensil} </li>`;
		optionsUstensils.insertAdjacentHTML("beforeend", li);*/
	});

	arrayAppliances.forEach((appliance) => {
		const cls = ["appliance-tag", "tag"];
		const itemAppliances = document.createElement("li");
		itemAppliances.classList.add(...cls);
		itemAppliances.setAttribute("data-value", "appliance");
		itemAppliances.innerText = appliance;
		optionsAppliances.appendChild(itemAppliances);

		/*const li = `<li  class="appliance-tag tag" data-value="appliance">${appliance} </li>`;
		optionsAppliances.insertAdjacentHTML("beforeend", li);*/
	});

	const tagElements = document.querySelectorAll(".tag");

	const recipesArray = await getRecettesApiData();
	tagElements.forEach((el) => {
		//console.log("tags", el);

		el.addEventListener("click", () => {
			//optionsIngedients.classList.add("selected");
			//tagElements.className = "selected";
			optionsIngedients.appendChild(el);
			console.log("tags", el);
			el.setAttribute("class", "selected");
			console.log("tags", el);

			createTag(el);

			let filtredRecipes = updateFilterElements(recipesArray);

			console.log("numOpen", numberRecipes);
			console.log("display", filtredRecipes);
			console.log("filtredRecipes : ", filtredRecipes);
			addTag(filtredRecipes, searchInput);

			const close = document.querySelectorAll(".close");
			close.forEach((btn) => {
				btn.addEventListener("click", (e) => {
					el.style.display = "block";
					e.target.closest("div").remove();
					console.log("tag1");

					let filtredRecipes = updateFilterElements(recipesArray);

					console.log("close filtredRecipes: ", filtredRecipes);
					addTag(filtredRecipes, searchInput);

					console.log("numClose", numberRecipes);
				});
			});
		});
	});
}

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
}

export function filterList(list, listClass, tagValue) {
	const displayedElement = document.querySelector(listClass);
	displayedElement.classList.remove("none");

	list.forEach((item) => {
		const tagValueToCheck = item.innerHTML.toLowerCase();
		//console.log("valueTochek", tagValueToCheck);

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

	const filterSection = document.querySelectorAll(".filter-section ");
	const filtershow = document.querySelector(".show");
	const filterChevron = document.querySelector(".icon-chevron");

	const isClickInsideInsideDropDow = Array.from(filterSection).some((box) =>
		box.contains(e.target)
	);
	if (!isClickInsideInsideDropDow && filtershow !== null) {
		filterChevron.classList.remove("icon-chevron");
		filtershow.classList.remove("show");
	}

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

/*
const dropdown = document.querySelector(".dropdown");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdown.addEventListener("click", (event) => {
	dropdownMenu.classList.toggle("dropdownMenu--active");
});

dropdown.addEventListener("blur", (event) => {
	dropdownMenu.classList.remove("dropdownMenu--active");
});
*/
