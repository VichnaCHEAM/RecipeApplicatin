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
function displayRecipes() {
  recipeList.innerHTML = '';

  recipes.forEach((recipe, index) => {
      const recipeDiv = document.createElement('div');
      recipeDiv.innerHTML = `
          <div class="card">
              <div class="card-content">
                  <h3 class="card-title">${recipe.name}</h3>
                  <img class="card-image" src="${recipe.image}">
                  <p class="card-description"><strong>Ingredients:</strong></p>
                  <p class="card-description">${recipe.ingredients.join('<br>')}</p>
                  <p class="card-description"><strong>Method:</strong></p>
                  <p class="card-description">${recipe.method}</p>
                  <button class="edit-button" data-index="${index}">Edit</button>
                  <button class="delete-button" data-index="${index}">Delete</button>
              </div>
          </div>`;
          recipeDiv.classList.add('recipe');
      recipeList.appendChild(recipeDiv);
  });

  noRecipes.style.display = recipes.length > 0 ? 'none' : 'flex';
}

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