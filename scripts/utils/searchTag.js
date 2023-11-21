//import { getRecettesApiData } from "../Api/api.js";

//import { normalizeValue } from "./normalizeValue.js";

import { dropdownToggle } from "./dropdownMenuToggle.js";

const optionsIngedients = document.querySelector("#ingredients-tags");
const optionsAppliances = document.querySelector("#appliances-tags");
const optionsUstensils = document.querySelector("#utensils-tags");

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

export function addTag(arrayRecipes) {
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
		let li = `<li>${ingredient} </li>`;
		optionsIngedients.insertAdjacentHTML("beforeend", li);
	});

	arrayUstensils.forEach((ustensil) => {
		let li = `<li>${ustensil} </li>`;
		optionsUstensils.insertAdjacentHTML("beforeend", li);
	});

	arrayAppliances.forEach((appliance) => {
		let li = `<li>${appliance} </li>`;
		optionsAppliances.insertAdjacentHTML("beforeend", li);
	});
}
