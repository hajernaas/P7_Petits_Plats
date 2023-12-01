const tagSection = document.querySelector(".tags-section");

//création des nouveaux tags aprés avoir effectuer une recherche avancées (ingredients-appareils-ustensiles)
export function createTag(tag) {
	const categorie = tag.getAttribute("data-value");
	if (!categorie) return;
	const tagElement = document.createElement("div");
	tagElement.classList.add("tags");
	tagElement.setAttribute("data-value", categorie);
	tagElement.innerHTML = `<p class="tag-content">${tag.innerText}<i class="close fa-solid fa-xmark"></i></p>`;
	tagSection.appendChild(tagElement);
	return tagElement;
}
