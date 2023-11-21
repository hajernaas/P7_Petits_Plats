export default function cardTemplateRecipes(data) {
	const { image, name, ingredients, time, description } = data;

	// Création article
	const card = document.createElement("article");
	card.setAttribute("class", "card");

	const card_container = document.createElement("div");
	card_container.setAttribute("class", "col-12 col-md-6 col-lg-4");

	const imgContainer = document.createElement("div");
	imgContainer.setAttribute("class", "img-container");

	const img = document.createElement("img");
	//const pictureRecipe = `assets/images/recettes/${image}`;
	// img.setAttribute("src", pictureRecipe);
	img.src = `assets/images/recettes/${image}`;
	img.setAttribute("alt", `${name}`);
	img.setAttribute("class", "card-img");

	const cookingTime = document.createElement("span");
	cookingTime.setAttribute("class", "card-time");
	cookingTime.innerText = `${time} min`;

	const cardBody = document.createElement("div");
	cardBody.setAttribute("class", "card-body");
	//Titre de la recette H2
	const cardTitle_h2 = document.createElement("h2");
	cardTitle_h2.setAttribute("class", "card-title");
	cardTitle_h2.innerText = `${name}`;

	const recipes_container = document.createElement("div");
	recipes_container.setAttribute("class", "recipes-container");
	//H3 card recette
	const cardTitle_recipes = document.createElement("h3");
	cardTitle_recipes.setAttribute("class", "card-title");
	cardTitle_recipes.innerText = "Recette";

	const cardTitle_Ingredients = document.createElement("h3");
	cardTitle_Ingredients.setAttribute("class", "card-title");
	cardTitle_Ingredients.innerText = "Ingredients";
	//description recette
	const description_recipes = document.createElement("p");
	description_recipes.setAttribute("class", "card-text card-description");
	description_recipes.innerText = `${description}`;
	//DIV ingredients
	const ingredients_container = document.createElement("div");
	ingredients_container.setAttribute("class", "ingredients-container");
	// création des ingredients dans l'article
	ingredients.forEach((element) => {
		//DIV  ingredients et Quantités
		const ingredients_Quantity = document.createElement("div");
		ingredients_Quantity.setAttribute("class", "ingredients-Quantity");

		const ingredient_name = document.createElement("p");
		ingredient_name.setAttribute("class", "card-text");
		ingredient_name.textContent = element.ingredient;

		const Quantity_unit = document.createElement("p");
		Quantity_unit.setAttribute("class", "card-text card-unit");
		if (element.quantity) {
			Quantity_unit.innerText = element.quantity;

			if (element.unit) {
				Quantity_unit.innerText += ` ${element.unit}`;
			}
		} else {
			Quantity_unit.innerText = "-";
		}

		ingredients_Quantity.appendChild(ingredient_name);
		ingredients_Quantity.appendChild(Quantity_unit);
		ingredients_container.appendChild(ingredients_Quantity);
	});

	// <div id="card-container" class="col-12 col-lg-4">

	card_container.appendChild(card);
	card.appendChild(imgContainer);
	card.appendChild(cardBody);
	imgContainer.appendChild(img);
	imgContainer.appendChild(cookingTime);

	cardBody.appendChild(cardTitle_h2);
	cardBody.appendChild(recipes_container);
	recipes_container.appendChild(cardTitle_recipes);
	recipes_container.appendChild(description_recipes);
	cardBody.appendChild(cardTitle_Ingredients);
	cardBody.appendChild(ingredients_container);

	return card_container;
}
