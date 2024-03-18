// THIS IS SEYHA'S CODE

function displayRecipes(target, menuItems, footerFunction) {
    menuItems.forEach((item, index) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe-item");
        recipeDiv.innerHTML = `
            <div class="card">
                <div class="card-content">
                       ${generateRecipeCardContent(item)}
                </div>
                <div class="card-footer">
                    ${footerFunction(index)}
                </div>
            </div>`;
        target.appendChild(recipeDiv);
    });
}


/**
 * Generates the HTML content of a recipe's card
 */
function generateRecipeCardContent(recipe) {
    let ingredientList = recipe.ingredients.map(ingredient => {
        return `<li>${ingredient}</li>`;
    }).join('');

    return `
        <h3 class="card-title">${recipe.name}</h3>
        <img class="card-image" src="${recipe.image}" alt="Menu image">
        <p class="card-description"><strong>Ingredients:</strong></p>
        <ul class="card-description">${ingredientList}</ul>
        <p class="card-description"><strong>Method:</strong></p>
        <p class="card-description">${recipe.method}</p>
    `;
}

// THIS IS VICHNA'S CODE
//Function for narbar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}
// Display recipes function and other parts of your code remain the same
const recipeList = document.querySelector('#recipe-list');
const noRecipes = document.getElementById('no-recipes');
const searchBox = document.getElementById('search-box');

function search(query) {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(query.toLowerCase());
    });

    recipeList.innerHTML = '';

    filteredRecipes.forEach(recipe => {
        const recipeEl = document.createElement('div');
        recipeEl.innerHTML = `
        <div class="card">
        <div class="card-content">
            <h3 class="card-title">${recipe.name}</h3>
            <img class="card-image" src="${recipe.image}"> <!-- Correct the attribute name to src -->
            <p class="card-description"><strong>Ingredients:</strong></p>
            <p class="card-description">${recipe.ingredients.join('<br>')}</p>
            <p class="card-description"><strong>Method:</strong></p>
            <p class="card-description">${recipe.method}</p>
            <button class="edit-button" data-index="${recipes.indexOf(recipe)}">Edit</button>
            <button class="delete-button" data-index="${recipes.indexOf(recipe)}">Delete</button>
            </div>
        </div>`;
        recipeEl.classList.add('recipe');
        recipeList.appendChild(recipeEl);
    });
}

searchBox.addEventListener('input', event => {
    // Remove the existing event listener before adding a new one
    searchBox.removeEventListener('input', event);
    search(event.target.value);
});
searchBox.value = '';