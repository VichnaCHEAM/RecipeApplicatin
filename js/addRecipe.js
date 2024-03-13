const form = document.querySelector('form');
let recipes = [];
document.addEventListener('DOMContentLoaded', function() {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
        displayRecipes();
    }
});

// Function to save recipes to localStorage
function saveRecipesToLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function handleSubmit(event) {
    event.preventDefault();

    const nameInput = document.querySelector('#recipe-name');
    const ingrInput = document.querySelector('#recipe-ingredients');
    const methodInput = document.querySelector('#recipe-method');
    const imageInput = document.querySelector('#image-upload');

    // Create a FileReader object to read the uploaded image file
    const reader = new FileReader();

    reader.onload = function(event) {
        const recipe = {
            name: nameInput.value,
            ingredients: ingrInput.value.split(',').map(ingredient => ingredient.trim()),
            method: methodInput.value,
            image: event.target.result // Use the result property of FileReader to get the image URL
        };

        recipes.push(recipe);

        nameInput.value = '';
        ingrInput.value = '';
        methodInput.value = '';

        displayRecipes();
        // Save recipes to localStorage
        saveRecipesToLocalStorage();
    };

    // Read the uploaded image file as a data URL
    reader.readAsDataURL(imageInput.files[0]);
}

form.addEventListener('submit', handleSubmit);

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

function handleDelete(event) {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.dataset.index;
        recipes.splice(index, 1);
        displayRecipes(); // Update the displayed recipes after deletion
        
        // Save recipes to localStorage
        saveRecipesToLocalStorage();
    }
}

recipeList.addEventListener('click', handleDelete); // Move this line outside the function
displayRecipes();

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
// Function to edit a recipe
function editRecipe(index) {
    const recipe = recipes[index];
    const nameInput = document.querySelector('#recipe-name');
    const ingrInput = document.querySelector('#recipe-ingredients');
    const methodInput = document.querySelector('#recipe-method');
    const imageInput = document.querySelector('#image-upload');

    nameInput.value = recipe.name;
    ingrInput.value = recipe.ingredients.join(', ');
    methodInput.value = recipe.method;

    // Change the form submit event listener to handle editing
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Update the existing recipe with the edited values
        recipe.name = nameInput.value;
        recipe.ingredients = ingrInput.value.split(',').map(ingredient => ingredient.trim());
        recipe.method = methodInput.value;

        // Check if a new image is selected for editing
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                recipe.image = event.target.result;
                saveRecipesToLocalStorage(); // Save edited recipe to local storage
                displayRecipes();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveRecipesToLocalStorage(); // Save edited recipe to local storage
            displayRecipes();
        }

        // Reset form fields after editing
        nameInput.value = '';
        ingrInput.value = '';
        methodInput.value = '';

        // Remove the event listener for editing after editing is done
        form.removeEventListener('submit', arguments.callee);
    });
}

// Function to handle edit button click
function handleEdit(event) {
    if (event.target.classList.contains('edit-button')) {
        const index = event.target.dataset.index;
        editRecipe(index);
    }
}

// Add event listener for edit button click
recipeList.addEventListener('click', handleEdit);

// Function to save recipes to localStorage
function saveRecipesToLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// recipeList.addEventListener('click', handleAdd);
function handleAdd(event) {
    if (event.target.classList.contains('add-button')) {
        const index = event.target.dataset.index;
        const recipe = recipes[index];
        // Construct the URL with query parameters for ingredient data
        const queryString = `?ingredients=${recipe.ingredients.join(',')}`;
        // Redirect to Menu.html with the ingredient data appended to the URL
        window.location.href = `index.html${queryString}`;
    }
}
