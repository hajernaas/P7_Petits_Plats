import { getRecettesApiData } from "../Api/api.js";
import { updateFilterElements } from "./updateFilters.js";
import { createTag } from "../Templates/createTag.js";
import { removeTag } from "../Templates/removeTag.js";
import { normalizeValue } from "./normalizeValue.js";
import { TagsSelected, getIngredient, getUstensils, getAppliances } from "./utils.js";

const optionsIngedients = document.querySelector("#ingredients-tags");
const optionsAppliances = document.querySelector("#appliances-tags");
const optionsUstensils = document.querySelector("#utensils-tags");

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

export async function addTag(arrayRecipes, searchInput) {
	optionsIngedients.innerHTML = "";
	optionsUstensils.innerHTML = "";
	optionsAppliances.innerHTML = "";

	const allTags = document.querySelectorAll(".tags");
	const recipesArray = await getRecettesApiData();

	const arrayIngredient = getIngredient(arrayRecipes);
	const arrayUstensils = getUstensils(arrayRecipes);
	const arrayAppliances = getAppliances(arrayRecipes);

	const ingredientsArrayTags = TagsSelected(allTags, "ingredient");
	const appliancesArrayTags = TagsSelected(allTags, "appliance");
	const ustensilsArrayTags = TagsSelected(allTags, "ustensil");

	console.log("aaaaaaaaaaaaaaaa", arrayAppliances, appliancesArrayTags);

	createListTags(
		arrayIngredient,
		ingredientsArrayTags,
		"ingredient",
		"ingredient-tag",
		optionsIngedients
	);
	createListTags(
		arrayAppliances,
		appliancesArrayTags,
		"appliance",
		"appliance-tag",
		optionsAppliances
	);
	createListTags(arrayUstensils, ustensilsArrayTags, "ustensil", "ustensil-tag", optionsUstensils);
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
				createTag(el);
			}
			let filtredRecipes = updateFilterElements(recipesArray);
			addTag(filtredRecipes, searchInput);
			const close = document.querySelectorAll(".close");
			close.forEach((btn) => {
				btn.addEventListener("click", (e) => {
					el.style.display = "block";
					e.target.closest("div").remove();
					let filtredRecipes = updateFilterElements(recipesArray);
					addTag(filtredRecipes, searchInput);
				});
			});
		});
	});
}
