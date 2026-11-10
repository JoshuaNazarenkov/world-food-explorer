const dishes = [
  {id:1,name:"Ramen",country:"Japan",region:"Asia",cuisine:"Japanese",emoji:"🍜",diet:["Dairy-free"],color:"#f4e6d5",description:"A comforting bowl of Japanese noodle soup, served in a rich broth with toppings like egg, scallions, and sliced pork.",ingredients:["Noodles","Broth","Scallions","Egg"],fact:"Ramen has many regional styles across Japan."},
  {id:2,name:"Margherita Pizza",country:"Italy",region:"Europe",cuisine:"Italian",emoji:"🍕",diet:["Vegetarian"],color:"#f5e7d8",description:"A classic Neapolitan pizza topped with tomato, mozzarella, and fresh basil.",ingredients:["Tomato","Mozzarella","Basil","Pizza dough"],fact:"Its colors are often said to represent the Italian flag."},
  {id:3,name:"Tacos al Pastor",country:"Mexico",region:"North America",cuisine:"Mexican",emoji:"🌮",diet:["Dairy-free"],color:"#f5e9c9",description:"Flavorful marinated pork cooked on a vertical spit and served in small corn tortillas with pineapple, onion, and cilantro.",ingredients:["Pork","Pineapple","Corn tortillas","Onion"],fact:"The dish was influenced by Lebanese shawarma cooking."},
  {id:4,name:"Butter Chicken",country:"India",region:"Asia",cuisine:"Indian",emoji:"🍛",diet:["Gluten-free"],color:"#f3dfce",description:"Tender chicken simmered in a creamy tomato-based sauce with butter and warming spices.",ingredients:["Chicken","Tomato","Butter","Cream","Spices"],fact:"Butter chicken originated in Delhi in the 1950s."},
  {id:5,name:"Pad Thai",country:"Thailand",region:"Asia",cuisine:"Thai",emoji:"🍝",diet:["Dairy-free"],color:"#f2e8d4",description:"Stir-fried rice noodles tossed with a sweet, tangy, and savory sauce, often served with peanuts and lime.",ingredients:["Rice noodles","Tamarind","Peanuts","Lime"],fact:"Pad Thai became a national dish in the 20th century."},
  {id:6,name:"Falafel",country:"Egypt / Middle East",region:"Africa",cuisine:"Middle Eastern",emoji:"🧆",diet:["Vegetarian","Vegan","Dairy-free"],color:"#e9edda",description:"Crispy golden balls or patties made from ground chickpeas or fava beans and herbs.",ingredients:["Chickpeas","Parsley","Garlic","Cumin"],fact:"Falafel is enjoyed in many countries across the Middle East."},
  {id:7,name:"Sushi",country:"Japan",region:"Asia",cuisine:"Japanese",emoji:"🍣",diet:["Gluten-free","Dairy-free"],color:"#f5e4dc",description:"Vinegared rice paired with ingredients such as seafood, vegetables, and sometimes seaweed.",ingredients:["Rice","Nori","Fish or vegetables","Rice vinegar"],fact:"Sushi began as a way of preserving fish."},
  {id:8,name:"Arepas",country:"Venezuela / Colombia",region:"South America",cuisine:"Latin American",emoji:"🫓",diet:["Gluten-free"],color:"#f2e8ca",description:"Round corn cakes that can be grilled, baked, or fried and filled with cheese, meats, or avocado.",ingredients:["Cornmeal","Water","Salt","Cheese or avocado"],fact:"Arepas are a staple food in both Venezuela and Colombia."},
  {id:9,name:"Greek Salad",country:"Greece",region:"Europe",cuisine:"Greek",emoji:"🥗",diet:["Vegetarian","Gluten-free"],color:"#e5eddf",description:"A refreshing salad with tomatoes, cucumber, olives, onion, and feta cheese.",ingredients:["Tomato","Cucumber","Olives","Feta"],fact:"Traditional Greek salad is often served without lettuce."},
  {id:10,name:"Jollof Rice",country:"West Africa",region:"Africa",cuisine:"West African",emoji:"🍚",diet:["Vegan","Gluten-free"],color:"#f3e3d3",description:"A beloved one-pot rice dish cooked in a rich tomato and pepper sauce with aromatic spices.",ingredients:["Rice","Tomatoes","Peppers","Onion","Spices"],fact:"Jollof rice inspires friendly debates across West Africa."},
  {id:11,name:"Poutine",country:"Canada",region:"North America",cuisine:"Canadian",emoji:"🍟",diet:["Gluten-free"],color:"#eee6d9",description:"A comfort-food classic of crispy fries topped with cheese curds and hot gravy.",ingredients:["Potatoes","Cheese curds","Gravy"],fact:"Poutine is widely associated with Quebec."},
  {id:12,name:"Feijoada",country:"Brazil",region:"South America",cuisine:"Brazilian",emoji:"🥘",diet:["Gluten-free"],color:"#eee2d5",description:"A hearty Brazilian black bean stew traditionally prepared with pork and served with rice and sides.",ingredients:["Black beans","Pork","Garlic","Onion","Rice"],fact:"Feijoada is often served as a weekend meal."}
];

const grid = document.querySelector("#food-grid");
const favoritesContent = document.querySelector("#favorites-content");
const searchInput = document.querySelector("#search-input");
const regionFilter = document.querySelector("#region-filter");
const dietFilter = document.querySelector("#diet-filter");
const sortFilter = document.querySelector("#sort-filter");
const dialog = document.querySelector("#dish-dialog");
const toast = document.querySelector("#toast");
let favorites = JSON.parse(localStorage.getItem("worldFoodFavorites") || "[]");
let toastTimer;

function isFavorite(id) { return favorites.includes(id); }
function saveFavorites() {
  localStorage.setItem("worldFoodFavorites", JSON.stringify(favorites));
  updateFavoriteCounts();
}
function updateFavoriteCounts() {
  document.querySelector("#favorite-count").textContent = favorites.length;
  document.querySelector("#nav-favorite-count").textContent = favorites.length;
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
}
function cardHTML(dish) {
  return `<article class="food-card">
    <div class="food-visual" style="--card-bg:${dish.color}">
      <span class="region-tag">${dish.region}</span><span class="food-emoji">${dish.emoji}</span>
      <button class="card-heart ${isFavorite(dish.id) ? "active" : ""}" data-favorite="${dish.id}" aria-label="${isFavorite(dish.id) ? "Remove" : "Save"} ${dish.name}" aria-pressed="${isFavorite(dish.id)}">${isFavorite(dish.id) ? "♥" : "♡"}</button>
    </div>
    <div class="card-body"><div class="card-meta">${dish.cuisine} · ${dish.country}</div>
      <h3>${dish.name}</h3><p>${dish.description}</p>
      <div class="card-bottom"><span class="diet-label">${dish.diet.join(" · ")}</span><button class="details-button" data-details="${dish.id}">Discover →</button></div>
    </div>
  </article>`;
}
function renderDishes() {
  const query = searchInput.value.trim().toLowerCase();
  const region = regionFilter.value;
  const diet = dietFilter.value;
  const filtered = dishes.filter(d => {
    const matchesText = [d.name,d.country,d.cuisine,d.description].join(" ").toLowerCase().includes(query);
    return matchesText && (region === "All" || d.region === region) && (diet === "All" || d.diet.includes(diet));
  });
  if (sortFilter.value === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sortFilter.value === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));
  grid.innerHTML = filtered.map(cardHTML).join("");
  const hasFilters = query || region !== "All" || diet !== "All";
  document.querySelector("#results-line").textContent = hasFilters
    ? `Showing ${filtered.length} of ${dishes.length} dishes`
    : `Showing all ${dishes.length} dishes`;
  document.querySelector("#empty-state").hidden = filtered.length !== 0;
  document.querySelector("#clear-filters").disabled = !hasFilters && sortFilter.value === "featured";
}
function renderFavorites() {
  const saved = dishes.filter(d => favorites.includes(d.id));
  favoritesContent.innerHTML = saved.length
    ? `<div class="food-grid">${saved.map(cardHTML).join("")}</div>`
    : `<p class="favorites-empty">♡ Your favorites will appear here. Save a dish you want to try!</p>`;
  updateFavoriteCounts();
}
function toggleFavorite(id) {
  favorites = isFavorite(id) ? favorites.filter(item => item !== id) : [...favorites,id];
  saveFavorites();
  renderDishes();
  renderFavorites();
  const dish = dishes.find(d => d.id === id);
  showToast(isFavorite(id) ? `${dish.name} added to favorites` : `${dish.name} removed from favorites`);
}
function showDetails(id) {
  const d = dishes.find(item => item.id === id);
  if (!d) return;
  document.querySelector("#dialog-content").innerHTML = `
    <div class="dialog-emoji" style="background:${d.color}">${d.emoji}</div>
    <div class="dialog-meta">${d.cuisine} · ${d.country} · ${d.region}</div>
    <h2 class="dialog-title" id="dialog-title">${d.name}</h2>
    <p class="dialog-description">${d.description}</p>
    <h3 class="dialog-subtitle">Common ingredients</h3>
    <div class="ingredient-list">${d.ingredients.map(i => `<span>${i}</span>`).join("")}</div>
    <h3 class="dialog-subtitle">Did you know?</h3><p class="dialog-description">${d.fact}</p>
    <button class="primary-button" id="dialog-favorite">${isFavorite(id) ? "♥ Saved to favorites" : "♡ Save to favorites"}</button>`;
  if (!dialog.open) dialog.showModal();
  document.querySelector("#dialog-favorite").addEventListener("click", () => {
    toggleFavorite(id);
    showDetails(id);
  });
}
document.addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const detailButton = event.target.closest("[data-details]");
  if (favoriteButton) { event.stopPropagation(); toggleFavorite(Number(favoriteButton.dataset.favorite)); }
  else if (detailButton) showDetails(Number(detailButton.dataset.details));
});
[searchInput,regionFilter,dietFilter,sortFilter].forEach(el => el.addEventListener("input",renderDishes));
document.querySelector("#clear-filters").addEventListener("click", () => {
  searchInput.value = "";
  regionFilter.value = "All";
  dietFilter.value = "All";
  sortFilter.value = "featured";
  renderDishes();
  searchInput.focus();
});
document.querySelector("#random-button").addEventListener("click", () => {
  const pool = dishes.filter(d => (regionFilter.value === "All" || d.region === regionFilter.value) && (dietFilter.value === "All" || d.diet.includes(dietFilter.value)));
  if (!pool.length) { showToast("No dishes match those filters. Try changing them!"); return; }
  const pick = pool[Math.floor(Math.random()*pool.length)];
  showDetails(pick.id);
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
renderDishes();
renderFavorites();
