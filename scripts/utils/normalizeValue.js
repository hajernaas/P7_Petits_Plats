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

export function filter(input) {
	return input.replace(/[<>&"/=]/g, "");
}
