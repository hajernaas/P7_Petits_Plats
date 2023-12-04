//Fonction pour le formatage des inputs
export function normalizeValue(value) {
	return (
		value
			.toLowerCase()
			.replace(/\s/g, "")
			// Enlever les accents
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
	);
}
//Fonction contre injection XSS
export function xssFilter(input) {
	return input.replace(/[<>&"/=]/g, "");
}
