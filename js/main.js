function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// Define menuItemsData globally or in a scope accessible to both generateShop and addToMenu functions
const menuItemsData = [
  {
    id: "1",
    name: "Hotpot Sichuan",
    duration: "20 min",
    desc: "Recommend in winter season",
    img: "images/soup sichuan.jpg",
},
{
    id: "2",
    name: "Hotpot Champinion",
    duration: "20 min",
    desc: "Recommend in winter season",
    img: "images/champinion.jpg",
},
{
    id: "3",
    name: "BBQ",
    duration: "30 min",
    desc: "Recommend group party",
    img: "images/bbq.jpg",
},
{
    id: "4",
    name: "Kteav Phnom Penh",
    duration: "1 hour",
    desc: "Soupe Healthy",
    img: "images/kteav.jpg",
},
{
    id: "5",
    name: "Beef Tek Prohok",
    duration: "30 min",
    desc: "Best Khmer Food",
    img: "images/beef.jpg",
},
{
    id: "6",
    name: "Chicken Dot Coca",
    duration: "1 hour",
    desc: "Best Khmer Food",
    img: "images/dot chicken .jpg",
},
{
    id: "7",
    name: "Fried Chciken",
    duration: "20 min",
    desc: "Snac",
    img: "images/fried chicken.jpg",
},

  // Add more items as needed
];


let generateShop = () => {
  let shop = document.getElementById("shop");
  
  shop.innerHTML = menuItemsData
    .map((x) => {
      let { id, name, duration, desc, img } = x;
      return `
        <div class="card-container" card-id=${id}>
          <div class="card">
            <h4>${name}</h4>
            <img width="220" src="${img}" alt="${name}">
            <div class="card-content">
              <h4>${desc}</h4>
              <p>Duration : ${duration}</p>
              <div class="button">
                <button class="card__btn" onclick='ingredient(${id})'>Ingredient</button>
                <button class="card__btn" onclick='addToMenu(${id})'>Add to Menu</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
};
generateShop(); 


//fidèle modele
function addToMenu(id) {
  console.log(menuItemsData);
  console.log(parseInt(id));
  const selectedItem = menuItemsData.find(item => parseInt(item.id) === parseInt(id));
  console.log(selectedItem);

  let menuItemString = localStorage.getItem("menu");
  let menuItems = menuItemString ? JSON.parse(menuItemString) : [];
  console.log(menuItems);
  menuItems.push(selectedItem);
  localStorage.setItem("menu", JSON.stringify(menuItems));

  if (selectedItem) {
    // const url = `Menu.html?id=${selectedItem.id}&name=${encodeURIComponent(selectedItem.name)}&duration=${encodeURIComponent(selectedItem.duration)}&desc=${encodeURIComponent(selectedItem.desc)}&img=${encodeURIComponent(selectedItem.img)}`;
    window.location.href = 'Menu.html';
  } else {
    alert('Item not found!');
  }
}
//
function ingredient(id) {
  console.log(menuItemsData);
  console.log(parseInt(id));
  const selectedItem = menuItemsData.find(item => parseInt(item.id) === parseInt(id));
  console.log(selectedItem);

  let menuItemString = localStorage.getItem("menu");
  let menuItems = menuItemString ? JSON.parse(menuItemString) : [];
  console.log(menuItems);
  menuItems.push(selectedItem);
  localStorage.setItem("menu", JSON.stringify(menuItems));

  if (selectedItem) {
    // const url = `Menu.html?id=${selectedItem.id}&name=${encodeURIComponent(selectedItem.name)}&duration=${encodeURIComponent(selectedItem.duration)}&desc=${encodeURIComponent(selectedItem.desc)}&img=${encodeURIComponent(selectedItem.img)}`;
    window.location.href = 'Ingredient.html';
  } else {
    alert('Item not found!');
  }
}

// // Add function to retrieve ingredient
// function ingredient(id) {
//   const selectedItem = menuItemsData.find(item => parseInt(item.id) === parseInt(id));
//   if (selectedItem) {
//     // Redirect to Ingredients.html page with selected item's details as query parameters
//     const url = `Ingredients.html?id=${selectedItem.id}&name=${encodeURIComponent(selectedItem.name)}&duration=${encodeURIComponent(selectedItem.duration)}&desc=${encodeURIComponent(selectedItem.desc)}&img=${encodeURIComponent(selectedItem.img)}`;
//     window.location.href = url;
//   } else {
//     console.log("Item not found!");
//   }
// }id


// Call generateShop function to populate the shop

