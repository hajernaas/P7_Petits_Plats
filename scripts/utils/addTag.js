import { getRecettesApiData } from "../Api/api.js";
import { updateFilterElements } from "./updateFilters.js";
import { createTag } from "../Templates/createTag.js";
import { removeTag } from "../Templates/removeTag.js";
import { normalizeValue } from "./normalizeValue.js";
import { TagsSelected, getIngredient, getUstensils, getAppliances } from "./utils.js";

const optIngedients = document.querySelector("#ingredients-tags");
const optAppliances = document.querySelector("#appliances-tags");
const optUstensils = document.querySelector("#utensils-tags");

// créer une liste des tags dans le code HTML pour remplir les menus déroulants
// et attribuer une classe selected au tag sélectionné
export function createListTags(
	arrayFilterSelector,
	selectedArrayTags,
	typeSelector,
	tagName,
	parentElement
) {
	console.log("arrayFilterSelector", arrayFilterSelector);
	console.log("selectedArrayTags", selectedArrayTags);
	console.log("typeSelector", typeSelector);
	console.log("tagName", tagName);

	arrayFilterSelector.forEach((filterSelector) => {
		let cls = [tagName, "tag"];
		if (selectedArrayTags.includes(normalizeValue(filterSelector))) {
			cls = [tagName, "tag", "selected"];
		}
		const itemTagLi = document.createElement("li");
		itemTagLi.classList.add(...cls);
		itemTagLi.setAttribute("data-value", typeSelector);
		itemTagLi.innerText = filterSelector;
		parentElement.appendChild(itemTagLi);
	});
}

//Ajouter et supprimer des tags depuis le menu déroulant et faire le mise à jour des recettes
export async function addTag(arrayRecipes) {
	optIngedients.innerHTML = "";
	optUstensils.innerHTML = "";
	optAppliances.innerHTML = "";

	const recipesArray = await getRecettesApiData();
	const allTags = document.querySelectorAll(".tags");
	const ingredients = getIngredient(arrayRecipes);
	const ustensils = getUstensils(arrayRecipes);
	const appliances = getAppliances(arrayRecipes);

	const ingredientsArrayTags = TagsSelected(allTags, "ingredient");
	const appliancesArrayTags = TagsSelected(allTags, "appliance");
	const ustensilsArrayTags = TagsSelected(allTags, "ustensil");

	createListTags(ingredients, ingredientsArrayTags, "ingredient", "ingredient-tag", optIngedients);
	createListTags(appliances, appliancesArrayTags, "appliance", "appliance-tag", optAppliances);
	createListTags(ustensils, ustensilsArrayTags, "ustensil", "ustensil-tag", optUstensils);

	const tagElements = document.querySelectorAll(".tag");
	tagElements.forEach((el) => {
		el.addEventListener("click", () => {
			if (
				ingredientsArrayTags.includes(normalizeValue(el.innerHTML)) ||
				appliancesArrayTags.includes(normalizeValue(el.innerHTML)) ||
				ustensilsArrayTags.includes(normalizeValue(el.innerHTML))
			) {
				console.log("remove tag");
				removeTag(el);
			} else {
				console.log("add tag");
				const tagElementCreated = createTag(el);
				tagElementCreated.addEventListener("click", (e) => {
					e.stopPropagation();
					console.log("remove tag element");
					e.target.closest("div").remove();
					const filtredRecipes = updateFilterElements(recipesArray);
					addTag(filtredRecipes);
				});
			}

			const filtredRecipes = updateFilterElements(recipesArray);
			addTag(filtredRecipes);
		});
	});
}
