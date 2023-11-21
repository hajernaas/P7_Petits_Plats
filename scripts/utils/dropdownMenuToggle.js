// Dropdown toggle behavior
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
			// If .show, aria-expanded informs the toggle is expanded
			btnToggle.setAttribute("aria-expanded", dropdownMenu.classList.contains("show"));
		});
	});
}
