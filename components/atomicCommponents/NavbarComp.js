class Navbar extends HTMLElement{
    constructor(){
        super();
    }

    async connectedCallback(){
        this.innerHTML =
        `<dropdown-profile></dropdown-profile>
        <header class="w-full bg-linear-to-r from-orange-500 to-rose-600 shadow-xl mb-5 sticky top-0 z-50 h-20">
            <div class="max-w-[1440px] mx-auto px-8 py-4 relative z-10 ">
                <div class="flex flex-row justify-between items-center gap-6">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-white text-orange-600 rounded-full flex items-center justify-center shadow-lg text-xl transform hover:rotate-12 transition-transform duration-300">
                            <i class="fa-solid fa-utensils"></i>
                        </div>
                        <span class="text-2xl font-extrabold text-white tracking-wide">Restosan</span>
                    </div>

                    <div class="relative w-full md:w-1/3 group md:flex hidden">
                    <form action="" class="flex w-full">
                        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-hover:text-white transition-colors"></i>
                        <input type="text" placeholder="Cari makanan favoritmu..." class="w-full py-3 pl-6 pr-6 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:bg-white/30 focus:ring-2 focus:ring-white/50 outline-none transition-all shadow-inner">
                        <button class="bg-orange-500 ml-3 w-20 h-auto text-white rounded-2xl border border-gray-100 cursor-pointer">
                        Cari
                        </button>
                    </form>
                    </div>
                    <div class="md:flex hidden">
                    <nav class="flex items-center gap-2 font-medium text-white/90">
                        <a href="#" class="hover:text-white hover:font-bold transition-all">Dashboard</a>
                        <a href="#" class="hover:text-white hover:font-bold transition-all">Contact Us</a>
                    </nav>
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
                    </div>
                    <div class="flex md:hidden">
                    <button class="bg-orange-500 text-white p-2 rounded border border-gray-50 cursor-pointer" data-id="showDropdownNavbar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-id="showDropdownNavbar"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" data-id="showDropdownNavbar"/></svg>
                    </button>
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
                    </div>
                </div>
            </div>

            <dropdown-navbar></dropdown-navbar>
        </header>`;
    }
}


customElements.define('navbar-element', Navbar);