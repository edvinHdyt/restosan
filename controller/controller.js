document.addEventListener("click", function(){
  const strId = event.target.dataset['id'];

  switch (strId) {
    case "showDropdownNavbar":
        manipulateDropdownNavbar();
        hideDropdownProfile();
      break;
    case "showDropdownProfile":
        manipulateDropdownProfile();
        hideDropdownNavbar();
      break;
    default:
      break;
  }
});

function hideDropdownNavbar(){
   const elm = document.getElementById("dropdownNavbar");

  if (!elm.classList.contains("opacity-0")){
    elm.classList.remove("translate-y-[-10px]");
    elm.classList.remove("animate-slidedown");
    elm.classList.remove("opacity-100");
    elm.classList.add("animate-slideup");

    timeout = setTimeout(()=> {
      elm.classList.add("translate-y-[-300px]");
      elm.classList.add("opacity-0");
    }, 200);
  }
}

function hideDropdownProfile(){
    const elm = document.getElementById("dropdownProfile");
    const elmParent = document.getElementById("parentDropdownProfile");

    if (!elm.classList.contains("opacity-0")){
        elm.classList.add("animate-profile-slidedown");
        elm.classList.remove("opacity-100");
        elm.classList.remove("animate-profile-slideup");

        setTimeout(() => {
          elm.classList.add("opacity-0");
          elm.classList.add("translate-y-20");
          elm.classList.add("hidden");
          elmParent.classList.remove('z-100');
          elmParent.classList.add('z-0');
        }, 100);
    }
}

function manipulateDropdownNavbar(){
  const elm = document.getElementById("dropdownNavbar");

  let timeout = null;
  if (elm.classList.contains("opacity-0")){
    elm.classList.remove("translate-y-[-300px]");
    elm.classList.remove("animate-slideup");
    elm.classList.remove("opacity-0");
    elm.classList.add("translate-y-[-10px]");
    elm.classList.add("opacity-100");
    elm.classList.add("animate-slidedown");
    
    timeout != null ? clearTimeout(timeout) : "";
  } else {
    elm.classList.remove("translate-y-[-10px]");
    elm.classList.remove("animate-slidedown");
    elm.classList.remove("opacity-100");
    elm.classList.add("animate-slideup");

    timeout = setTimeout(()=> {
      elm.classList.add("translate-y-[-300px]");
      elm.classList.add("opacity-0");
    }, 200);
  }
}


function manipulateDropdownProfile(){
  const elm = document.getElementById("dropdownProfile");
  const elmParent = document.getElementById("parentDropdownProfile");
  let timeout = null;

  if (elm.classList.contains("opacity-0")){
    elm.classList.remove("opacity-0");
    elm.classList.remove("translate-y-20");
    elm.classList.remove("animate-profile-slidedown");
    elm.classList.remove("hidden");
    elm.classList.add("opacity-100");
    elm.classList.add("animate-profile-slideup");

    elmParent.classList.remove('z-0');
    elmParent.classList.add('z-100');

    timeout != null ? clearTimeout(timeout) : "";
  }else{
    elm.classList.add("animate-profile-slidedown");
    elm.classList.remove("opacity-100");
    elm.classList.remove("animate-profile-slideup");

    

    setTimeout(() => {
      elm.classList.add("opacity-0");
      elm.classList.add("translate-y-20");
      elm.classList.add("hidden");
      elmParent.classList.remove('z-100');
      elmParent.classList.add('z-0');
    }, 100);
  }
}

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
    if (!menu == null && !menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
    }
  }
};

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
