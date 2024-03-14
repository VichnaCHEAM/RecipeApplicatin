function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

window.addEventListener('DOMContentLoaded', function(event) {
    let menuItemString = localStorage.getItem("recipes");
    let menuItems = menuItemString ? JSON.parse(menuItemString) : [];  
    console.log(menuItems);
    const menuElement = document.getElementById("menu");
    
    menuItems.forEach((item, index) => {
        const recipeDiv = document.createElement("div");
        let ingredientList = item.ingredients.map(ingredient => `<li>${ingredient}</li>`);
        recipeDiv.classList.add("recipe-item");
        recipeDiv.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <img class="card-image" src="${item.image}">
                    <p class="card-description"><strong>Ingredients:</strong></p>
                    <ul class="card-description">${ingredientList}</ul>
                    <p class="card-description"><strong>Method:</strong></p>
                    <p class="card-description">${item.method}</p>
                    <button class="add-button" data-index="${index}">Add</button>
                </div>
            </div>`;
        menuElement.appendChild(recipeDiv);
    });

    // Event listener for the "Add" buttons inside each card
    const addButtonElements = document.querySelectorAll('.add-button');
    addButtonElements.forEach(button => {
        button.addEventListener('click', function(event) {
            const index = event.target.dataset.index;
            const recipe = menuItems[index];
            saveRecipeToLocal(recipe);
            displayRecipeCard(recipe);
        });
    });
});

// Function to save recipe to localStorage
// function saveRecipeToLocal(recipe) {
//     let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
//     recipes.push(recipe);
//     localStorage.setItem('recipes', JSON.stringify(recipes));
// }


// Function to display recipe card
// function displayRecipeCard(recipe) {
//     const recipeCard = document.createElement('div');
//     recipeCard.innerHTML = `
//         <div class="card">
//             <div class="card-content">
//                 <h3 class="card-title">${recipe.name}</h3>
//                 <img class="card-image" src="${recipe.image}">
//                 <p class="card-description"><strong>Ingredients:</strong></p>
//                 <p class="card-description"><strong>Method:</strong></p>
//                 <p class="card-description">${recipe.method}</p>
//                 <button class="add-button1" data-index="${index}">Add</button>
//             </div>
//         </div>`;
//     document.getElementById('menu').appendChild(recipeCard);
// }













