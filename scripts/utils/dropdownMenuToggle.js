//afficher et masquer les menus ingédients , unstensiles, appareils
const dropdownToggleBtns = document.querySelectorAll(".dropdown-toggle");
export function dropdownToggle() {
	dropdownToggleBtns.forEach((btnToggle) => {
		btnToggle.addEventListener("click", () => {
			console.log("Appel click");
			const dropdownMenu = btnToggle.nextElementSibling;

			if (dropdownMenu.classList.contains("show") == false) {
				btnToggle.nextElementSibling.classList.remove("show");
				btnToggle.setAttribute("aria-expanded", false);
			}

			dropdownMenu.classList.toggle("show");
			btnToggle.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
		});
	});
}

//fermer les menus en cas de click externe

/*
document.addEventListener("click", (e) => {
	const filterSection = document.querySelectorAll(".filter-section ");
	const filterCollapsed = document.querySelector(".dropdown-menu");
	const filterCollapsedChevron = document.querySelector(".icon-chevron");

	const isClickInsideInsideDropDow = Array.from(filterSection).some((box) =>
		box.contains(e.target)
	);
	if (!isClickInsideInsideDropDow && filterCollapsed !== null) {
		filterCollapsedChevron.classList.remove("icon-chevron");
		filterCollapsed.classList.remove("dropdown-menu");
	}
});
*/
