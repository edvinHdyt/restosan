const STORAGE_KEY_RATING = 'restosan-ratings';
const STORAGE_KEY_USER_LOGIN = 'restosan-user-login';
const STORAGE_KEY_USER = 'restosan-users';
const STORAGE_KEY_COMMENTS = "restosan-reviews";

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
    case "logout":
      localStorage.removeItem(STORAGE_KEY_USER_LOGIN);
      window.location.href = "login.html"
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


async function initUsers() {
    // console.log(localStorage.getItem(STORAGE_KEY_USER))
    if (localStorage.getItem(STORAGE_KEY_USER) === null) {
        try {
            const res = await fetch("https://dummyjson.com/c/f0d0-1f34-4c32-b63c");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.users;

            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

async function initReview() {
    // console.log(localStorage.getItem(STORAGE_KEY_USER))
    if (localStorage.getItem(STORAGE_KEY_COMMENTS) === null) {
        try {
            const res = await fetch("https://dummyjson.com/c/7d70-3b31-41a3-a8d6");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.reviews;

            localStorage.setItem(STORAGE_KEY_COMMENTS, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

async function initRatings() {
    // console.log(localStorage.getItem(STORAGE_KEY_USER))
    if (localStorage.getItem(STORAGE_KEY_RATING) === null) {
        try {
            const res = await fetch("https://dummyjson.com/c/74c6-605d-44b7-86a8");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.ratings;

            localStorage.setItem(STORAGE_KEY_RATING, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

initUsers();
initReview();
initRatings();

// document.getElementById('searchInput').addEventListener('keypress', function (e) {
//   if (e.key === "Enter") {
//     window.location.href = "/hasilsearch.html"
//   }
// });

