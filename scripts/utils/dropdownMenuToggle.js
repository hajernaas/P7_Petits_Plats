//afficher et masquer les menus ingédients , unstensiles, appareils

const dropdownToggleBtns = document.querySelectorAll(".dropdown-toggle");
export function dropdownToggle() {
	dropdownToggleBtns.forEach((btnToggle) => {
		btnToggle.addEventListener("click", () => {
			const dropdownMenu = btnToggle.nextElementSibling;
			//const x = document.getElementById("ch-ingr");
			if (dropdownMenu.classList.contains("show") == false) {
				btnToggle.nextElementSibling.classList.remove("show");

				document.getElementById("ch-ingr").classList.remove("icon-chevron-up");
				btnToggle.setAttribute("aria-expanded", false);
			}
			dropdownMenu.classList.toggle("show");
			document.getElementById("ch-ingr").classList.toggle("icon-chevron-up");
			btnToggle.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
		});
	});
}

//fermer les menus en cas de click externe

document.addEventListener("click", (e) => {
	console.log("click outside");
	const filterSection = document.querySelectorAll(".filter-section ");
	const filtershow = document.querySelector(".show");
	const filterChevron = document.querySelector(".icon-chevron-up");
	const isClickDropDowMenu = Array.from(filterSection).some((box) => box.contains(e.target));
	if (!isClickDropDowMenu && filtershow !== null) {
		filterChevron.classList.remove("icon-chevron-up");
		filtershow.classList.remove("show");
	}
});

dropdownToggle();
