const tagSection = document.querySelector(".tags-section");

// Function to create a new tag
export function createTag(tag) {
	//addTag(recipesFilter);
	console.log("gg");
	const categorie = tag.getAttribute("data-value");
	console.log("categorie", categorie);

	if (!categorie) return;

	const tagElement = document.createElement("div");
	tagElement.classList.add("tags");
	tagElement.setAttribute("data-value", categorie);

	tagElement.innerHTML = `<p class="tag-content">${tag.innerText}<i class="close fa-solid fa-xmark"></i></p>`;

	tagSection.appendChild(tagElement);
	//tag.style.display = "none";
}
