//supprimer les tags sélectionnés depuis le menu déroulant
export function removeTag(tag) {
	console.log("tag to remove ", tag);
	const allTags = document.querySelectorAll(".tags");
	allTags.forEach((t) => {
		if (tag.innerText == t.innerText) {
			t.remove();
		}
	});
}
