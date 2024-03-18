window.addEventListener('DOMContentLoaded', function(event) {
    let menuItemString = localStorage.getItem("recipes");
    let menuItems = menuItemString ? JSON.parse(menuItemString) : [];  

    let footerFunction = function (index) {
        return `<button class="add-button" data-index="${index}">Add</button>`
    };

    displayRecipes(document.getElementById("menu"), menuItems, footerFunction);

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