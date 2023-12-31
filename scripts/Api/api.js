// Récupération des infos sur les recettes  depuis le fichier JSON
export async function getRecettesApiData() {
	try {
		const url = "./data/recipes.json";
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}
