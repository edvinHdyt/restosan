class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="w-full bg-gradient-to-r from-orange-500 to-rose-600 shadow-xl rounded-b-[40px] mb-12 relative overflow-hidden">
      <div class="absolute top-[-50%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-[1440px] mx-auto px-8 py-8 relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white text-orange-600 rounded-full flex items-center justify-center shadow-lg text-xl transform hover:rotate-12 transition-transform duration-300">
              <i class="fa-solid fa-utensils"></i>
            </div>
            <span class="text-2xl font-extrabold text-white tracking-wide">Restosan</span>
          </div>
          <nav class="flex items-center gap-8 font-medium text-white/90">
            <a href="#" class="hover:text-white hover:font-bold transition-all">Dashboard</a>
            <a href="#contact-us" class="hover:text-white hover:font-bold transition-all">Contact Us</a>
            <a href="/login.html" class="hover:text-white hover:font-bold transition-all">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-orange-600 transition-all shadow-lg">
                <i class="fa-regular fa-user text-lg"></i>
              </div>
            </a>
          </nav>
        </div>
      </div>
    </header>
    `;
  }
}
customElements.define("main-navbar", Navbar);

class NavbarSearch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
       <header class="w-full bg-gradient-to-r from-orange-500 to-rose-600 shadow-xl rounded-b-[40px] mb-12 relative overflow-hidden">
        
        <div class="absolute top-[-50%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-[1440px] mx-auto px-8 py-8 relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-white text-orange-600 rounded-full flex items-center justify-center shadow-lg text-xl transform hover:rotate-12 transition-transform duration-300">
                        <i class="fa-solid fa-utensils"></i>
                    </div>
                    <span class="text-2xl font-extrabold text-white tracking-wide">Restosan</span>
                </div>

                <div class="relative w-full md:w-1/3 group">
                    <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-colors"></i>
                    <input type="text" placeholder="Cari makanan favoritmu..." 
                           class="w-full py-3 pl-12 pr-6 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:bg-white/30 focus:ring-2 focus:ring-white/50 outline-none transition-all shadow-inner">
                </div>

                <nav class="flex items-center gap-8 font-medium text-white/90">
                    <a href="#" class="hover:text-white hover:font-bold transition-all">Dashboard</a>
                    <a href="#" class="hover:text-white hover:font-bold transition-all">Contact Us</a>
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-orange-600 transition-all shadow-lg">
                        <i class="fa-regular fa-user text-lg"></i>
                    </div>
                </nav>

            </div>
        </div>
    </header>
    `;
  }
}

customElements.define("main-navbarSearch", NavbarSearch);
