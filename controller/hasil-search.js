/*Script Hasil Search */
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