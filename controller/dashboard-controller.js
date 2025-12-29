document.addEventListener("click", function(){
  const strId = event.target.dataset['id'];

  switch (strId) {
    case "filterKota":
      let idKota = event.target.dataset["value"];
      let obj = {
        idKota : parseInt(idKota)
      }

      showRestaurants(obj);
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
    showKota();

    let ratings = localStorage.getItem(STORAGE_KEY_RATING);
    if(ratings == undefined){
      let res = await fetch(" https://dummyjson.com/c/74c6-605d-44b7-86a8");
      let data = await res.json();

      localStorage.setItem(STORAGE_KEY_RATING, JSON.stringify(data["ratings"]));
    }

    showRestaurants();
}

const showKota = async() => {
    const kotaMenu = document.getElementById("kotaMenu");
    const res = await fetch("https://dummyjson.com/c/5a11-e1c4-4b69-bc14");
    let dataCities = await res.json();
    dataCities = dataCities["cities"];

    Array.from(dataCities).forEach(elm => {
        const a = document.createElement("a");
        a.setAttribute("class", "flex items-center px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer");
        a.setAttribute("data-id", "filterKota");
        a.setAttribute("data-value", elm["id"]);

        a.innerHTML = `
        <div class="w-4 h-4 mr-2"></div>
        ${elm["kota"]}
        `;

        kotaMenu.appendChild(a);
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
          (!params.idRating  || data.id_rating === params.idRating) &&
          (!params.idKota    || data["id_city"] === params.idKota) &&
          (!params.idCategory|| data.id_category === params.idCategory) &&
          (!params.idPrice   || data.id_price_range === params.idPrice) &&
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


initial();