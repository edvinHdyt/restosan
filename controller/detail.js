// Data rating buat ngitng persentase (kosong gara-gara awal)
let ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
};

let totalReviews = 0;
let currentRating = 0;
let reviewModal, mapModal, addReviewBtn;

document.addEventListener('DOMContentLoaded', function() {
    reviewModal = document.getElementById('reviewModal');
    mapModal = document.getElementById('mapModal');
    addReviewBtn = document.getElementById('addReviewBtn');
    
    // Set event listener buat bintang rating
    if (addReviewBtn) {
        addReviewBtn.onclick = function() {
            reviewModal.classList.remove('hidden');
            setTimeout(() => {
                reviewModal.classList.remove('opacity-0');
            }, 10);
        }
    }
    
    updateRatingStats();
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
    // ngitung total reviews
    totalReviews = Object.values(ratingCounts).reduce((a, b) => a + b, 0);
    
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
        const noReviewsMessage = document.getElementById('noReviewsMessage');
        if (noReviewsMessage) noReviewsMessage.style.display = 'block';
        return;
    }
    
    const noReviewsMessage = document.getElementById('noReviewsMessage');
    if (noReviewsMessage) noReviewsMessage.style.display = 'none';
    
    // perhitungan rata-rata rating
    let totalScore = 0;
    for (let rating = 1; rating <= 5; rating++) {
        totalScore += rating * ratingCounts[rating];
    }
    const averageRating = (totalScore / totalReviews).toFixed(1);
    const averageRatingElement = document.getElementById('averageRating');
    if (averageRatingElement) averageRatingElement.innerText = averageRating;
    
    // Update progress bar dan persentase
    for (let rating = 1; rating <= 5; rating++) {
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

    const name = isAnon ? "Anonymous" : "User Baru";
    const date = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    
    ratingCounts[currentRating]++;
    
    // buat HTML bintang
    let starsHtml = '';
    for(let i=0; i<5; i++) {
        if(i < currentRating) {
            starsHtml += '<i class="fa-solid fa-star text-yellow-400 text-xs md:text-sm"></i>';
        } else {
            starsHtml += '<i class="fa-regular fa-star text-gray-300 text-xs md:text-sm"></i>';
        }
    }

    // susunan HTML review baru
    const newReviewHTML = `
        <div class="pb-4 md:pb-6 border-b border-gray-200 last:border-0 animation-fade-in" data-rating="${currentRating}">
            <div class="flex items-start gap-3 md:gap-4">
                <div class="flex-shrink-0">
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
                        <span class="text-xs text-gray-400">${date}</span>
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
                    <a href="https://maps.google.com/?q=Gormeteria+Bandung" target="_blank" class="inline-flex items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 transition-colors shadow-sm mt-4">
                        <i class="fa-solid fa-external-link-alt mr-2"></i> Buka di Google Maps
                    </a>
                </div>
            `;
            mapContainer.classList.add('fallback');
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMapFallback();
});