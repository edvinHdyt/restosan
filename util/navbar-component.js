class Navbar extends HTMLElement {
  connectedCallback() {
    let userLogin = localStorage.getItem("restosan-user-login");
    userLogin = userLogin == undefined ? userLogin : JSON.parse(userLogin);

    let profileMenu = `
    <li class="cursor-pointer mb-2 hover:bg-amber-100 hover:text-black px-2 py-2 rounded">
        <a href="login.html" class="w-full flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-2 rotate-180"><path fill="currentColor" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z" /></svg>
            Log in
        </a>
    </li>
    `;

    let profilePict = `
    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-orange-600 transition-all shadow-lg text-white ml-3" data-id="showDropdownProfile">
        <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-id="showDropdownProfile"
        >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            data-id="showDropdownProfile"
            />
        </svg>
    </div>
    `;

    if (userLogin != undefined && userLogin.profile_pict != undefined){
        profilePict = `
        <img src="${userLogin.profile_pict}" class="w-10 h-10 cursor-pointer rounded-full ml-3" data-id="showDropdownProfile">
        `
    }
 
    let dropdownProfileHeight = "h-14";
    if (userLogin != undefined){
        dropdownProfileHeight = "h-30";
        profileMenu = `
        <li class="cursor-pointer mb-2 hover:bg-amber-100 hover:text-black px-2 py-2 rounded">
            <a href="profile.html" class="w-full flex">
                <svg
                    class="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                ${userLogin.nama}
            </a>
        </li>
         <li class="cursor-pointer mb-2 hover:bg-amber-100 hover:text-black px-2 py-2 rounded">
            <a class="w-full flex" data-id="logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-2 rotate-180"><path fill="currentColor" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z" /></svg>
                Log Out
            </a>
        </li>
        `
    }
    
    this.innerHTML = `
      <div class="w-full sticky top-0 z-0 " id="parentDropdownProfile">
        <div class="absolute right-10 bottom-0 top-15 w-50 ${dropdownProfileHeight} bg-white border border-gray-50 shadow shadow-gray-600 p-2 rounded translate-y-20 opacity-0 hidden" id="dropdownProfile">
            <ul class="max-w-[1440px] text-black/70">
                ${profileMenu}
            </ul>
        </div>
    </div>
      <header class="w-full bg-linear-to-r from-orange-500 to-rose-600 shadow-xl mb-5 sticky top-0 z-50 h-20">
          <div class="max-w-[1440px] mx-auto px-8 py-4 relative z-10 ">
              <div class="flex flex-row justify-between items-center gap-6">
                   <a href="index.html" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
                      <div class="bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-md">
                          <img src="Gambar/LogoRestosan.png" 
                              alt="Logo" 
                              class="w-full h-full object-contain" />
                      </div>
                      <span class="text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
                          Restosan
                      </span>
                  </a>

                  <div class="relative w-full md:w-1/3 group md:flex hidden">
                 
                  </div>
                  <div class="md:flex hidden">
                  <nav class="flex items-center gap-2 font-medium text-white">
                      <a href="index.html" class="hover:text-white hover:font-bold transition-all">Dashboard</a>
                      <a href="index.html#contact-us" class="hover:text-white hover:font-bold transition-all">Contact Us</a>
                  </nav>
                  <div id="defaultPictShow">
                    ${profilePict}
                  </div>
                    <div id="changePictShow" class="hidden">
                        <img src="" class="w-10 h-10 cursor-pointer rounded-full ml-3" data-id="showDropdownProfile" id="showProfileNav">
                    </div>
                  </div>
                  <div class="flex md:hidden">
                  <button class="bg-orange-500 text-white p-2 rounded border border-gray-50 cursor-pointer" data-id="showDropdownNavbar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-id="showDropdownNavbar"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" data-id="showDropdownNavbar"/></svg>
                  </button>
                    <div id="defaultPictShow">
                    ${profilePict}
                  </div>
                    <div id="changePictShow" class="hidden">
                        <img src="" class="w-10 h-10 cursor-pointer rounded-full ml-3" data-id="showDropdownProfile" id="showProfileNav">
                    </div>
                  </div>
              </div>
          </div>

          <div class="w-full pt-0 md:px-9 pb-5  h-auto bg-linear-to-r from-orange-500 to-rose-600 shadow-xl translate-y-[-300px] opacity-0 md:opacity-0 z-0 sticky top-0" id="dropdownNavbar">
            <ul class="max-w-[1440px] mx-auto px-8 py-4 text-white">
              <li class="cursor-pointer mb-2 hover:bg-amber-50 hover:text-black px-2 py-2 rounded">
                <a href="index.html" class="w-full block">Dashboard</a>
              </li>
              <li class="cursor-pointer mb-2 hover:bg-amber-50 hover:text-black px-2 py-2 rounded">
                <a href="index.html#contact-us" class="w-full block">Contact Us</a>
              </li>
            </ul>
          </div>
      </header>
    `;
  }
}
customElements.define("main-navbar", Navbar);

class NavbarSearch extends HTMLElement {
  connectedCallback() {
    let userLogin = localStorage.getItem("restosan-user-login");
    userLogin = userLogin == undefined ? userLogin : JSON.parse(userLogin);

    let profileMenu = `
    <li class="cursor-pointer mb-2 hover:bg-amber-100 hover:text-black px-2 py-2 rounded">
        <a href="login.html" class="w-full flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-2 rotate-180"><path fill="currentColor" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z" /></svg>
            Log in
        </a>
    </li>
    `;

    let profilePict = `
    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-orange-600 transition-all shadow-lg text-white ml-3" data-id="showDropdownProfile">
        <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-id="showDropdownProfile"
        >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            data-id="showDropdownProfile"
            />
        </svg>
    </div>
    `;

    if (userLogin != undefined && userLogin.profile_pict != undefined){
        profilePict = `
        <img src="${userLogin.profile_pict}" class="w-10 h-10 cursor-pointer rounded-full ml-3" data-id="showDropdownProfile">
        `
    }
 
     let dropdownProfileHeight = "h-14";
    if (userLogin != undefined){
        dropdownProfileHeight = "h-30";
        profileMenu = `
        <li class="cursor-pointer mb-2 hover:bg-amber-100 hover:text-black px-2 py-2 rounded">
            <a href="profile.html" class="w-full flex">
                <svg
                    class="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                ${userLogin.nama}
            </a>
        </li>
         <li class="cursor-pointer mb-2 hover:bg-amber-100 hover:text-black px-2 py-2 rounded">
            <a class="w-full flex" data-id="logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-2 rotate-180"><path fill="currentColor" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z" /></svg>
                Log Out
            </a>
        </li>
        `
    }

    this.innerHTML = `
       <div class="w-full sticky top-0 z-0 " id="parentDropdownProfile">
        <div class="absolute right-10 bottom-0 top-15 w-50 ${dropdownProfileHeight} bg-white border border-gray-50 shadow shadow-gray-600 p-2 rounded translate-y-20 opacity-0 hidden" id="dropdownProfile">
        <ul class="max-w-[1440px] mx-auto text-black/70">
                ${profileMenu}
            </ul>
        </div>
    </div>
      <header class="w-full bg-linear-to-r from-orange-500 to-rose-600 shadow-xl mb-5 sticky top-0 z-50 h-20">
          <div class="max-w-[1440px] mx-auto px-8 py-4 relative z-10 ">
              <div class="flex flex-row justify-between items-center gap-6">
                   <a href="index.html" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
                      <div class="bg-white h-12 w-12 rounded-full flex items-center justify-center shadow-md">
                          <img src="Gambar/LogoRestosan.png" 
                              alt="Logo" 
                              class="w-full h-full object-contain" />
                      </div>
                      <span class="text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
                          Restosan
                      </span>
                  </a>

                  <div class="relative w-full md:w-1/3 group md:flex hidden">
                  <form action="hasilsearch.html"  method="get" class="flex w-full">
                      <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-colors"></i>
                      <input type="text" placeholder="Cari restaurant favoritmu..." class="w-full py-3 pl-6 pr-6 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:bg-white/30 focus:ring-2 focus:ring-white/50 outline-none transition-all shadow-inner" name="restaurant">
                      <button class="bg-orange-500 ml-3 w-20 h-auto text-white rounded-2xl border border-gray-100 cursor-pointer">
                      Cari
                      </button>
                  </form>
                  </div>
                  <div class="md:flex hidden">
                  <nav class="flex items-center gap-2 font-medium text-white">
                      <a href="index.html" class="hover:text-white hover:font-bold transition-all">Dashboard</a>
                      <a href="index.html#contact-us" class="hover:text-white hover:font-bold transition-all">Contact Us</a>
                  </nav>
                  <div id="defaultPictShow">
                    ${profilePict}
                  </div>
                    <div id="changePictShow" class="hidden">
                       <img class="w-10 h-10 cursor-pointer rounded-full ml-3" data-id="showDropdownProfile" id="showProfileNav">
                    </div>
                  </div>
                  <div class="flex md:hidden">
                  <button class="bg-orange-500 text-white p-2 rounded border border-gray-50 cursor-pointer" data-id="showDropdownNavbar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-id="showDropdownNavbar"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" data-id="showDropdownNavbar"/></svg>
                  </button>
                  <div id="responsiveDefaultPictShow">
                    ${profilePict}
                  </div>
                    <div id="responsiveChangePictShow" class="hidden">
                        <img  class="w-10 h-10 cursor-pointer rounded-full ml-3" data-id="showDropdownProfile" id="responsiveShowProfileNav">
                    </div>
                  </div>
              </div>
          </div>

          <div class="w-full pt-0 md:px-9 pb-5  h-auto bg-linear-to-r from-orange-500 to-rose-600 shadow-xl translate-y-[-300px] opacity-0 md:opacity-0 z-0 sticky top-0" id="dropdownNavbar">
            <ul class="max-w-[1440px] mx-auto px-8 py-4 text-white">
              <li class="cursor-pointer mb-2 hover:bg-amber-50 hover:text-black px-2 py-2 rounded">
                <a href="index.html" class="w-full block">Dashboard</a>
              </li>
              <li class="cursor-pointer mb-2 hover:bg-amber-50 hover:text-black px-2 py-2 rounded">
                <a href="index.html#contact-us" class="w-full block">Contact Us</a>
              </li>
              <li>
                <div class="relative w-full group flex">
                    <form action="hasilsearch.html" method="get" class="flex w-full">
                      <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-colors"></i>
                      <input type="text" placeholder="Cari restaurant favoritmu..." class="w-full py-3 pl-6 pr-6 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:bg-white/30 focus:ring-2 focus:ring-white/50 outline-none transition-all shadow-inner" name="restaurant">
                      <button class="bg-orange-500 ml-3 w-20 h-auto text-white rounded-2xl border border-gray-100 cursor-pointer" >
                        Cari
                      </button>
                    </form>
                  </div>
              </li>
            </ul>
          </div>
      </header>
    `;
  }
}

customElements.define("main-navbar-search", NavbarSearch);
