const STORAGE_KEY_RATING = 'restosan-ratings';
const STORAGE_KEY_USER_LOGIN = 'restosan-user-login';
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


// document.getElementById('searchInput').addEventListener('keypress', function (e) {
//   if (e.key === "Enter") {
//     window.location.href = "/hasilsearch.html"
//   }
// });

