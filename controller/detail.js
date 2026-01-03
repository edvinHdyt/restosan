
let totalReviews = 0;
let currentRating = 0;
let reviewModal, mapModal, addReviewBtn;

const url = new URLSearchParams(window.location.search);
const idRestaurant = parseInt(url.get("id"));
const month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sept", "Oct", "Nov", "Des"];

let userLogin = localStorage.getItem(STORAGE_KEY_USER_LOGIN);
userLogin = userLogin == undefined ? userLogin : JSON.parse(userLogin);

document.addEventListener('DOMContentLoaded', function() {
    reviewModal = document.getElementById('reviewModal');
    mapModal = document.getElementById('mapModal');
    addReviewBtn = document.getElementById('addReviewBtn');
    
    // Set event listener buat bintang rating
    if (addReviewBtn) {
        addReviewBtn.onclick = function() {
            if (userLogin == null){
                window.location.href = "login.html";
                return;
            }
            reviewModal.classList.remove('hidden');
            setTimeout(() => {
                reviewModal.classList.remove('opacity-0');
            }, 10);
        }
    }
    
    // updateRatingStats();
});


function closeReviewModal() {
    reviewModal.classList.add('opacity-0');
    setTimeout(() => {
        reviewModal.classList.add('hidden');
        resetForm();
    }, 300);
}

// fungsi set rating
function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-input');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('fa-regular', 'text-gray-300');
            star.classList.add('fa-solid', 'text-yellow-400');
        } else {
            star.classList.remove('fa-solid', 'text-yellow-400');
            star.classList.add('fa-regular', 'text-gray-300');
        }
    });
}

function resetForm() {
    const reviewText = document.getElementById('reviewText');
    const anonymous = document.getElementById('anonymous');
    
    if (reviewText) reviewText.value = '';
    if (anonymous) anonymous.checked = false;
    setRating(0);
}

// buat update statistik rating
function updateRatingStats() {
    // Data rating buat ngitng persentase (kosong gara-gara awal)
    let ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    // ngitung total reviews
    // totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0);
    
    let dataComments = localStorage.getItem(STORAGE_KEY_COMMENTS);
    dataComments = dataComments == undefined ? 0 : JSON.parse(dataComments);

    dataComments = dataComments.filter((data) => {
        return data["id_restaurant"] == idRestaurant;
    });

    
    totalReviews = dataComments.length;
    
    // Update rating count display
    const reviewCountTitle = document.getElementById('reviewCountTitle');
    if (reviewCountTitle) {
        reviewCountTitle.innerText = `All Reviews (${totalReviews})`;
    }
    
    if (totalReviews === 0) {
        // kalo belum ada review
        const averageRating = document.getElementById('averageRating');
        if (averageRating) averageRating.innerText = '0.0';
        
        for (let i = 1; i <= 5; i++) {
            const ratingBar = document.getElementById(`ratingBar${i}`);
            const ratingPercent = document.getElementById(`ratingPercent${i}`);
            if (ratingBar) ratingBar.style.width = '0%';
            if (ratingPercent) ratingPercent.innerText = '0%';
        }
        // const noReviewsMessage = document.getElementById('noReviewsMessage');
        // if (noReviewsMessage) noReviewsMessage.style.display = 'block';
        return;
    }
    
    // const noReviewsMessage = document.getElementById('noReviewsMessage');
    // if (noReviewsMessage) noReviewsMessage.style.display = 'none';
    
    // perhitungan rata-rata rating
    Array.from(dataComments).forEach(elm => {
        ratingCounts[elm["rating"]]++;
    });

    let totalScore = 0;
    for (let rating = 1; rating <= 5; rating++) {
        totalScore += rating * ratingCounts[rating];
    }

    const averageRating = (totalScore / totalReviews).toFixed(1);
    const averageRatingElement = document.getElementById('averageRating');
    if (averageRatingElement) averageRatingElement.innerText = averageRating;

    // update data rating localstorage
    let dataRatings = JSON.parse(localStorage.getItem(STORAGE_KEY_RATING));
    let newDataRatings = dataRatings.filter((data) => data["id_restaurant"] == idRestaurant);

    let idRating = dataRatings.indexOf(newDataRatings[0])
    newDataRatings[0].rating = parseFloat(averageRating);
    dataRatings[idRating] = newDataRatings[0];

    localStorage.setItem(STORAGE_KEY_RATING, JSON.stringify(dataRatings));
    
    // Update progress bar dan persentase
    for (let rating = 1; rating <= 5; rating++) {
        // console.log(dataComments[rating - 1]["rating"]);
        const percentage = totalReviews > 0 ? (ratingCounts[rating] / totalReviews) * 100 : 0;
        const ratingBar = document.getElementById(`ratingBar${rating}`);
        const ratingPercent = document.getElementById(`ratingPercent${rating}`);
        
        if (ratingBar) ratingBar.style.width = `${percentage}%`;
        if (ratingPercent) ratingPercent.innerText = `${Math.round(percentage)}%`;
    }
}

// fungsi submit review
function submitReview() {
    const reviewText = document.getElementById('reviewText');
    const anonymous = document.getElementById('anonymous');

    if (!reviewText || !anonymous) {
        console.error('Form review tidak ditemukan');
        return;
    }

    const text = reviewText.value;
    const isAnon = anonymous.checked;


    if (currentRating === 0) {
        alert("Pilih rating terlebih dahulu");
        return;
    }

    if (!text.trim()) {
        alert("Tulis review terlebih dahulu");
        return;
    }

    let dataReviews = localStorage.getItem(STORAGE_KEY_COMMENTS) == undefined ? []: JSON.parse(localStorage.getItem(STORAGE_KEY_COMMENTS));

    const name = isAnon ? "Anonymous" : userLogin.nama;
    const date = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    let d = new Date();
    
    let obj = {
        id_user : userLogin.id,
        id_restaurant: idRestaurant,
        rating: currentRating,
        comment: text,
        created_at: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`, 
        isAnon
    }

    dataReviews.push(obj);
    
    localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(dataReviews));
    
    // ratingCounts[currentRating]++;
    
    // buat HTML bintang
    let starsHtml = '';
    for(let i=0; i<5; i++) {
        if(i < currentRating) {
            starsHtml += '<i class="fa-solid fa-star text-yellow-400 text-xs md:text-sm"></i>';
        } else {
            starsHtml += '<i class="fa-regular fa-star text-gray-300 text-xs md:text-sm"></i>';
        }
    }
    
    const newReviewHTML = `
        <div class="pb-4 md:pb-6 border-b border-gray-200 last:border-0 animation-fade-in" data-rating="${currentRating}">
            <div class="flex items-start gap-3 md:gap-4">
                <div class="shrink-0">
                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-full ${isAnon ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center">
                        <i class="fa-solid fa-user text-white text-xs md:text-sm"></i>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="font-bold text-gray-900 text-sm md:text-base">${name}</span>
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <div class="flex text-yellow-400">
                            ${starsHtml}
                        </div>
                        <span class="text-xs text-gray-600">${date}</span>
                    </div>
                    <p class="text-gray-800 text-xs md:text-sm">${text}</p>
                </div>
            </div>
        </div>
    `;

    // tambah review baru ke daftar
    const list = document.getElementById('reviewsList');
    if (list) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newReviewHTML;
        list.prepend(tempDiv.firstElementChild);

        updateRatingStats();
    }
    
    closeReviewModal();
}


// buat fungsi buka modal map
function openMapModal() {
    mapModal.classList.remove('hidden');
    setTimeout(() => {
        mapModal.classList.remove('opacity-0');
    }, 10);
}

// fungsi tutup modalnya
function closeMapModal() {
    mapModal.classList.add('opacity-0');
    setTimeout(() => {
        mapModal.classList.add('hidden');
    }, 300);
}

// nambah tombol escape buat tutup modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (reviewModal && !reviewModal.classList.contains('hidden')) {
            closeReviewModal();
        }
        if (mapModal && !mapModal.classList.contains('hidden')) {
            closeMapModal();
        }
    }
});

// Fungsi fallback kalau peta gagal dimuat
function initMapFallback() {
    const mapIframe = document.querySelector('.map-container iframe');
    // console.log(mapIframe)
    if (mapIframe) {
        mapIframe.onerror = function() {
            const mapContainer = this.parentElement;
            mapContainer.innerHTML = `
                <div class="fallback">
                    <h4>Oops! Something went wrong.</h4>
                    <p>This page didn't load Google Maps correctly.</p>
                    <div class="mt-4">
                        <p><strong>Gormeteria, Bandung</strong></p>
                        <p>Buka setiap hari, 08:00–22:00</p>
                    </div>
                    <a href="" target="_blank" class="inline-flex items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 transition-colors shadow-sm mt-4">
                        <i class="fa-solid fa-external-link-alt mr-2"></i> Buka di Google Maps
                    </a>
                </div>
            `;
            mapContainer.classList.add('fallback');
        };
    }
}

const createDateFormat = (dateNow) => {
    const d = new Date(dateNow);
    let day = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
    let date =  day + " " + month[d.getMonth()] +" "+d.getFullYear(); 
 
    return date;
}


const initializeDetail = async () => {
    loadContentDeteail();
    loadFavoriteMenu();
    loadReview();
}

const loadReview = async() => {
    const noReviews = document.getElementById("noReviewsMessage");
    let storageReview = localStorage.getItem(STORAGE_KEY_COMMENTS);

    if (storageReview == undefined){
        let res = await fetch("https://dummyjson.com/c/7d70-3b31-41a3-a8d6");
        let dataReview = await res.json();

        localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(dataReview["reviews"]));
    }

    storageReview = JSON.parse(localStorage.getItem(STORAGE_KEY_COMMENTS));


    let dataReviews = storageReview.map(e => e).filter((data) => data['id_restaurant'] == idRestaurant);

    let dataUser = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));

    if (dataReviews.length > 0){
        noReviews.classList.add("block");
    }

    Array.from(dataReviews).forEach(elm => {
        let user = dataUser.filter((data) => {
            return data["id"] == elm["id_user"]
        });
        

        let starsHtml = '';
        let currentRating = elm["rating"];
        for(let i=0; i<5; i++) {
            if(i < currentRating) {
                starsHtml += '<i class="fa-solid fa-star text-yellow-400 text-xs md:text-sm"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star text-gray-300 text-xs md:text-sm"></i>';
            }
        }

        let date = createDateFormat(elm["created_at"])

        let name = user[0].nama;
        if (elm["isAnon"] != undefined && elm["isAnon"] == true){
            name = "Anonymous";
        }

        let profilePict = `
            <img src=" ${user[0].profile_pict}" class="w-8 h-8 md:w-10 md:h-10 rounded-full" alt="${name}">
        `;

        if (user[0].profile_pict == undefined){
            if (elm["isAnon"] != undefined && elm["isAnon"] == true){
                profilePict = `
                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <i class="fa-solid fa-user text-white text-xs md:text-sm"></i>
                    </div>
                `;
            } else {
                  profilePict = `
                    <div class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <i class="fa-solid fa-user text-white text-xs md:text-sm"></i>
                    </div>
                `;
            }
        }
        // susunan HTML review baru
        const newReviewHTML = `
            <div class="pb-4 md:pb-6 border-b border-gray-200 last:border-0 animation-fade-in" data-rating="${currentRating}">
                <div class="flex items-start gap-3 md:gap-4">
                    <div class="shrink-0">
                        ${profilePict}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="font-bold text-gray-900 text-sm md:text-base">${name}</span>
                        </div>
                        <div class="flex items-center gap-2 mb-2">
                            <div class="flex text-yellow-400">
                                ${starsHtml}
                            </div>
                            <span class="text-xs text-gray-600">${date}</span>
                        </div>
                        <p class="text-gray-800 text-xs md:text-sm">${elm["comment"]}</p>
                    </div>
                </div>
            </div>
        `;

        // tambah review baru ke daftar
        const list = document.getElementById('reviewsList');
        if (list) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newReviewHTML;
            list.prepend(tempDiv.firstElementChild);

        }
    });
    
    updateRatingStats();
}
const loadContentDeteail = async () => {
    const restaurantName = document.getElementById("restaurantName");
    const restaurantRating = document.getElementById("restaurantRating");
    const restaurantLocation = document.getElementById("restaurantLocation");
    const restaurantDesc = document.getElementById("restaurantDesc");
    const mapsRestaurant = document.getElementById("mapsRestaurant");
    const descMapRestaurant = document.getElementById("deskripsiMapRestaurant");
    const gambarRestaurant = document.getElementById("gambarRestaurant");
    const restaurantMaps = document.getElementById("restaurantMaps");

    let res = await fetch("https://dummyjson.com/c/4e56-4272-4630-904c");
    let dataRestaurants = await res.json();

    dataRestaurants = dataRestaurants["restaurants"].map(e => e).filter((data) => data["id"] == idRestaurant);

    let rating = JSON.parse(localStorage.getItem(STORAGE_KEY_RATING));
    rating = rating.filter((data) => data["id_restaurant"] == idRestaurant);

    res = await fetch("https://dummyjson.com/c/5a11-e1c4-4b69-bc14");
    let kota = await res.json();

    kota = kota["cities"].filter((data) => data["id"] == dataRestaurants[0]["id_city"]);
    
    restaurantName.innerText = dataRestaurants[0].nama;
    restaurantRating.innerText = rating[0].rating;
    restaurantLocation.innerText = `(${kota[0].kota})`;
    restaurantDesc.innerText = dataRestaurants[0].description;
    descMapRestaurant.innerHTML = `
    <i class="fa-solid fa-location-dot text-orange-500 mr-2"></i>
    ${dataRestaurants[0].nama}, ${kota[0].kota}
    `
    gambarRestaurant.src = `./Gambar/RestaurantImage/${dataRestaurants[0]["nama"]}/${dataRestaurants[0]["foto"][0]}`;

    restaurantMaps.src = dataRestaurants[0].link_maps_embed;
    mapsRestaurant.href = dataRestaurants[0].link_maps;
}

const loadFavoriteMenu = async () => {
    const parentnya = document.getElementById("favoriteMenu");

    const res = await fetch("https://dummyjson.com/c/cce1-80b0-4a4e-ae66");
    let dataMenu = await res.json(); 
    dataMenu = dataMenu["top_menu"];

    dataMenu = dataMenu.map(e => e).filter((data) => {
        return data["id_restaurant"] == idRestaurant; 
    });

    Array.from(dataMenu).forEach((elm) => {
        const div = document.createElement("div");

        div.innerHTML = `
         <div class="bg-gray-50 p-4 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div class="bg-gray-200 rounded-xl w-full aspect-square mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
                <img src="./Gambar/${elm["foto_menu"]}" alt="${elm["nama"]}" class="w-full h-full object-cover">
            </div>
            <h3 class="font-bold text-gray-900 text-base md:text-lg">${elm["nama"]}</h3>
            <p class="text-gray-600 text-xs md:text-sm mb-2">${elm["category_menu"]}</p>
            <p class="font-bold text-orange-700 text-sm md:text-base">Rp ${elm["harga"]}</p>
        </div>
        `;

        parentnya.appendChild(div);
    })
}

document.addEventListener('DOMContentLoaded', function() {
    initializeDetail();
    initMapFallback();
});


