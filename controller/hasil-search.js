/*Script Hasil Search */
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
    case "viewDetails":
        let id = event.target.dataset["value"];
        window.location.href=`detail.html?id=${id}`;
        break;
    default:
      break;
  }
});

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


const initialzeSearch = async() => {
    const param = new URLSearchParams(window.location.search);
    const restaurant = param.get("restaurant").toLowerCase();

    const restaurantsContainer = document.getElementById("searchContainer");
    restaurantsContainer.innerHTML = "";

    let res = await fetch("https://dummyjson.com/c/0259-d778-49b7-a921");
    let dataRestaurants = await res.json();

    dataRestaurants = dataRestaurants["restaurants"].map(e => e).filter((data) => {
      return (
        (!restaurant || data["nama"].toLowerCase().includes(restaurant))
      );
    } );

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
              <img src="./Gambar/RestaurantDisplay/baliRestuarant.jpg" alt="Steak 1" class="w-full h-full object-cover shrink-0 snap-center" />
              <img src="./Gambar/RestaurantDisplay/Restaurant2.jpeg" alt="Steak 2" class="w-full h-full object-cover shrink-0 snap-center" />
              <img src="./Gambar/RestaurantDisplay/Restaurant3.jpg" alt="Steak 3" class="w-full h-full object-cover shrink-0 snap-center" />
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

initialzeSearch();