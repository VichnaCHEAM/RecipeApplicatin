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
            //saveRecipesToLocalStorage(); // Save edited recipe to local storage
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

// // Function to save recipes to localStorage
// function saveRecipesToLocalStorage() {
//     localStorage.setItem('recipes', JSON.stringify(recipes));
// }
