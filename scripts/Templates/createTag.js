const tagSection = document.querySelector(".tags-section");

// Function to create a new tag
export function createTag(tag) {
	const categorie = tag.getAttribute("data-value");

	if (!categorie) return;

	const tagElement = document.createElement("div");
	tagElement.classList.add("tags");
	tagElement.setAttribute("data-value", categorie);

	tagElement.innerHTML = `<p class="tag-content">${tag.innerText}<i class="close fa-solid fa-xmark"></i></p>`;

	tagSection.appendChild(tagElement);
	//tag.style.display = "none";
}

export function removeTag(tag) {
	console.log("tag to remove ", tag);
	const allTags = document.querySelectorAll(".tags");
	allTags.forEach((t) => {
		if (tag.innerText == t.innerText) {
			t.remove();
		}
	});
}
