document.addEventListener("click", function(){
  const strId = event.target.dataset['id'];
  switch (strId) {
    case "filtering":
      filterProcess();
      break;
    case "searchRestaurant":
        let searchInput = document.getElementById("searchDashboard");
        let objSearch = {
          nama_restaurant : searchInput.value.toLowerCase()
        }

        showRestaurants(objSearch);
      break;
    case "viewDetails":
        let id = event.target.dataset["value"];
        window.location.href=`detail.html?id=${id}`;
        break;
    default:
      break;
  }
});


function toggleDropdown() {
  const menu = document.getElementById("kotaMenu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
}

window.onclick = function (event) {
  if (!event.target.closest("#kotaBtn")) {
    const menu = document.getElementById("kotaMenu");
    if (!menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
    }
  }
};

function slideRight(btn) {
  const slider = btn.parentElement.querySelector('.slider-container');
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScrollLeft - 5) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
          slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
      }
  }

  function slideLeft(btn) {
    const slider = btn.parentElement.querySelector('.slider-container');
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft <= 5) {
          slider.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      } else {
          slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
      }
  }

const initial = async () => {
    const kotaMenu = document.getElementById("kotaMenu");
    let res = await fetch("https://dummyjson.com/c/5a11-e1c4-4b69-bc14");
    let dataCities = await res.json();
    dataCities = dataCities["cities"];

    const kategoriMenu = document.getElementById("kategoriMenu");
    res = await fetch("https://dummyjson.com/c/0667-2db6-48f4-a001");
    let dataKategori = await res.json();
    dataKategori = dataKategori["categories"];

    const hargaMenu = document.getElementById("hargaMenu");
    res = await fetch("https://dummyjson.com/c/196c-0e3f-4240-82cc");
    let dataHarga = await res.json();
    dataHarga = dataHarga["price_ranges"];

    
    addFilterChild(kotaMenu, dataCities, "kota");
    addFilterChild(kategoriMenu, dataKategori, "category");
    addFilterChild(hargaMenu, dataHarga, "price_range");

    let ratings = localStorage.getItem(STORAGE_KEY_RATING);
    if(ratings == undefined){
      let res = await fetch(" https://dummyjson.com/c/74c6-605d-44b7-86a8");
      let data = await res.json();

      localStorage.setItem(STORAGE_KEY_RATING, JSON.stringify(data["ratings"]));
    }

    showRestaurants();
}

const filterProcess = () => {
  const ratingBtn = document.getElementById("ratingBtn");
  const kotaBtn = document.getElementById("kotaBtn");
  const kategoriBtn = document.getElementById("kategoriBtn");
  const hargaBtn = document.getElementById("hargaBtn");

  console.log(ratingBtn.dataset["selected"]);

  let obj = {
    idKota : kotaBtn.dataset["selected"],
    idCategory : kategoriBtn.dataset["selected"],
    idPrice : hargaBtn.dataset["selected"],
    ratingRange: ratingBtn.dataset["selected"]
  }

  showRestaurants(obj);
}


const addFilterChild = async(element, data, dataName) => {    
     Array.from(data).forEach(elm => {
        const a = document.createElement("a");
        a.setAttribute("class", "filter-option flex items-center px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-all duration-150 hover:translate-x-1 hover:text-gray-900");
        a.setAttribute("data-id", "filtering");
        a.setAttribute("data-value", elm["id"]);

        a.innerHTML = `
        <div class="w-4 h-4 mr-2"></div>
        ${elm[dataName]}
        `;

        element.appendChild(a);
    });
}

const showRestaurants = async(params) => {
    const restaurantsContainer = document.getElementById("restaurantSection");
    restaurantsContainer.innerHTML = "";

    let res = await fetch("https://dummyjson.com/c/4e56-4272-4630-904c");
    let dataRestaurants = await res.json();

    if (params != undefined){
      dataRestaurants = dataRestaurants["restaurants"].map(e => e).filter((data) => {
        return (
          (!params.idKota    || data["id_city"] === parseInt(params.idKota)) &&
          (!params.idCategory|| data["id_category"] === parseInt(params.idCategory)) &&
          (!params.idPrice   || data["id_price_range"] === parseInt(params.idPrice)) &&
          (!params.nama_restaurant || data["nama"].toLowerCase().includes(params.nama_restaurant))
        );
      } );
    }else {
      dataRestaurants = dataRestaurants["restaurants"];
    }

    res = await fetch("https://dummyjson.com/c/0667-2db6-48f4-a001");
    let dataCategories = await res.json();
    dataCategories = dataCategories["categories"];

    res = await fetch("https://dummyjson.com/c/5a11-e1c4-4b69-bc14");
    let dataCities = await res.json();
    dataCities = dataCities["cities"];

    res = await fetch("https://dummyjson.com/c/196c-0e3f-4240-82cc");
    let dataPrices = await res.json();
    dataPrices = dataPrices["price_ranges"];

    let dataRating = JSON.parse(localStorage.getItem(STORAGE_KEY_RATING));

    if(params != undefined && params.ratingRange != undefined){
        dataRating = dataRating.filter((data) => {
          return data["rating"] >= parseFloat(params.ratingRange) && data["rating"] < parseFloat(params.ratingRange) + 1;
        });

        console.log(dataRating)

        let tempDataRestaurant = [];

        Array.from(dataRating).forEach(elm => {
          Array.from(dataRestaurants).forEach(restaurant => {
            if(restaurant["id"] == elm["id_restaurant"]){
              tempDataRestaurant.push(restaurant);
            }
          });
        });

        dataRestaurants = tempDataRestaurant;
    }
    
    Array.from(dataRestaurants).forEach(elm => {
        const article = document.createElement("article");
        article.setAttribute("class", "group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-50 relative");

        let namaRestaurant = elm["nama"];
        if (elm["nama"].length > 15) {
            namaRestaurant = namaRestaurant.substring(0, 15);
            last = namaRestaurant.lastIndexOf(" ");
            namaRestaurant = namaRestaurant.substring(0, last);
            namaRestaurant += "...";
        }

        let category = dataCategories.filter((data) => {
          return data["id"] == elm["id_category"];
        });

        let city = dataCities.filter((data) => {
          return data["id"] == elm["id_city"];
        });

        let price = dataPrices.filter((data) => {
          return data["id"] == elm["id_price_range"];
        });

        let rating = dataRating.filter((data) => {
          return data["id_restaurant"] == elm["id"]
        });

        article.innerHTML = `
        <div class="h-48 bg-gray-200 relative group/slider">
            <div class="slider-container flex overflow-x-auto snap-x snap-mandatory h-full w-full scroll-smooth">
              <img src="./Gambar/RestaurantImage/${elm["nama"]}/${elm["foto"][0]}" alt="Steak 1" class="w-full h-full object-cover shrink-0 snap-center" />
              <img src="./Gambar/RestaurantImage/${elm["nama"]}/${elm["foto"][1]}" alt="Steak 2" class="w-full h-full object-cover shrink-0 snap-center" />
              <img src="./Gambar/RestaurantImage/${elm["nama"]}/${elm["foto"][2]}" alt="Steak 3" class="w-full h-full object-cover shrink-0 snap-center" />
            </div>
            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 z-10"><i class="fa-solid fa-star text-yellow-400"></i> ${rating[0].rating}</div>
            <button
              aria-label="icon"
              onclick="slideLeft(this)"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-10 cursor-pointer">
              <i class="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button
              aria-label="icon"
              onclick="slideRight(this)"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-10 cursor-pointer">
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-gray-800 text-lg mb-1 group-hover:text-orange-600 transition-colors">${namaRestaurant}</h3>
            <p class="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wide">${category[0].category}</p>
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-1 text-xs text-gray-500">
                <i class="fa-solid fa-location-dot text-red-400"></i>
                <span class="truncate max-w-[70px]">${city[0].kota}</span>
              </div>
              <div class="flex items-center gap-1 text-xs font-semibold text-gray-700">
                <i class="fa-solid fa-tag text-green-500"></i>
                <span>${price[0].price_range}</span>
              </div>
            </div>
            <button class="cursor-pointer w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transform active:scale-95 transition-all" data-id="viewDetails" data-value="${elm["id"]}">View Details</button>
          </div>
        `;

        restaurantsContainer.appendChild(article);
    });
}


class FilterDropdown {
  constructor() {
    this.activeMenu = null;
    this.init();
  }

  init() {
    // Setup event listeners for each filter button
    const filters = [
      { btn: 'ratingBtn', menu: 'ratingMenu', icon: 'ratingIcon' },
      { btn: 'kotaBtn', menu: 'kotaMenu', icon: 'kotaIcon' },
      { btn: 'kategoriBtn', menu: 'kategoriMenu', icon: 'kategoriIcon' },
      { btn: 'hargaBtn', menu: 'hargaMenu', icon: 'hargaIcon' }
    ];

    

    filters.forEach(({ btn, menu, icon }) => {
      const button = document.getElementById(btn);
      const dropdown = document.getElementById(menu);
      const arrowIcon = document.getElementById(icon);

      if (button && dropdown) {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleMenu(menu, icon, button);
        });

        // Add click listeners to menu items
        dropdown.querySelectorAll('.filter-option').forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            this.selectOption(button, item.textContent.trim(), item.getAttribute('data-value'));
            this.closeAllMenus();
          });
        });
      }
    });

    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearAllFilters());
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => this.closeAllMenus());
    
    // Close dropdowns when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeAllMenus();
    });
  }

  toggleMenu(menuId, iconId, button) {
    const menu = document.getElementById(menuId);
    const icon = document.getElementById(iconId);
    
    // If this menu is already active, close it
    if (this.activeMenu === menuId) {
      this.closeMenu(menu, icon, button);
      this.activeMenu = null;
      return;
    }
    
    // Close any open menu first
    this.closeAllMenus();
    
    // Open the clicked menu
    this.openMenu(menu, icon, button);
    this.activeMenu = menuId;
  }

  openMenu(menu, icon, button) {
    if (!menu || !icon) return;
    
    menu.classList.remove('hidden', 'opacity-0', 'translate-y-1');
    menu.classList.add('block', 'opacity-100', 'translate-y-0');
    icon.classList.remove('rotate-0');
    icon.classList.add('rotate-180');
    
    // Add active state to button
    if (button) {
      button.classList.add('border-gray-400', 'bg-gray-100', 'text-gray-800');
      button.classList.remove('border-gray-300', 'bg-white');
    }
  }

  closeMenu(menu, icon, button) {
    if (!menu || !icon) return;
    
    menu.classList.remove('block', 'opacity-100', 'translate-y-0');
    menu.classList.add('hidden', 'opacity-0', 'translate-y-1');
    icon.classList.remove('rotate-180');
    icon.classList.add('rotate-0');
    
    // Remove active state from button
    if (button) {
      button.classList.remove('border-gray-400', 'bg-gray-100', 'text-gray-800');
      button.classList.add('border-gray-300', 'bg-white');
    }
  }

  closeAllMenus() {
    const menus = ['ratingMenu', 'kotaMenu', 'kategoriMenu', 'hargaMenu'];
    const icons = ['ratingIcon', 'kotaIcon', 'kategoriIcon', 'hargaIcon'];
    const buttons = ['ratingBtn', 'kotaBtn', 'kategoriBtn', 'hargaBtn'];
    
    menus.forEach((menuId, index) => {
      const menu = document.getElementById(menuId);
      const icon = document.getElementById(icons[index]);
      const button = document.getElementById(buttons[index]);
      
      if (menu && icon) {
        this.closeMenu(menu, icon, button);
      }
    });
    
    this.activeMenu = null;
  }

  selectOption(button, text, value) {
    if (!button) return;
    
    // Update button text to show selection
    const originalText = button.id.replace('Btn', '');
    const buttonText = button.querySelector('span') || button.firstChild;
    
    // Create new content for button
    button.innerHTML = `
      <span class="font-medium">${text}</span>
      <svg class="w-4 h-4 ml-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    `;
    
    // Get the new icon element
    const newIcon = button.querySelector('svg');
    if (newIcon) {
      newIcon.id = button.id.replace('Btn', 'Icon');
      newIcon.classList.add('text-gray-400');
    }
    
    // Add visual feedback for active filter
    button.classList.add('bg-blue-50', 'border-blue-200', 'text-blue-600', 'font-medium');
    button.classList.remove('text-gray-600', 'border-gray-300', 'hover:bg-gray-50');
    
    // Store the selected value as data attribute
    button.setAttribute('data-selected', value);
    
    // console.log(`Filter selected: ${button.id} = ${value}`);
  }

  clearAllFilters() {
    const buttons = ['ratingBtn', 'kotaBtn', 'kategoriBtn', 'hargaBtn'];
    const defaultTexts = {
      'ratingBtn': 'Rating',
      'kotaBtn': 'Kota',
      'kategoriBtn': 'Kategori',
      'hargaBtn': 'Harga'
    };
    
    buttons.forEach(btnId => {
      const button = document.getElementById(btnId);
      if (button) {
        // Reset button text
        button.innerHTML = `
          ${defaultTexts[btnId]}
          <svg id="${btnId.replace('Btn', 'Icon')}" class="w-4 h-4 ml-1 text-gray-400 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        `;
        
        // Reset button styling
        button.classList.remove('bg-blue-50', 'border-blue-200', 'text-blue-600', 'font-medium');
        button.classList.add('border-gray-300', 'bg-white', 'text-gray-600', 'hover:bg-gray-50');
        
        // Remove selected data
        button.removeAttribute('data-selected');
      }
    });

    showRestaurants();
    
    // console.log('All filters cleared');
  }
}

// Initialize the filter dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', async() => {
  await initial();
  new FilterDropdown();
});