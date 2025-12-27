// FooterComponent.js
class MainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="w-full bg-gray-200 rounded-t-[40px] mt-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div class="max-w-[1440px] mx-auto px-8 py-10 text-center">
          <h2 class="text-2xl font-bold mb-2 tracking-wide text-orange-600">Restosan</h2>

          <p class="text-gray-600 text-sm mb-6 font-medium">Temukan makanan lezat di sekitarmu dengan mudah.</p>

          <div class="flex justify-center gap-4 mb-6">
            <i class="fa-brands fa-instagram text-2xl text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"></i>
            <i class="fa-brands fa-twitter text-2xl text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"></i>
            <i class="fa-brands fa-facebook text-2xl text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"></i>
          </div>

          <p class="text-gray-500 text-xs font-medium">© Kelompok 4 2025. Made with ❤️ in Jakarta.</p>
        </div>
      </footer>
    `;
  }
}

// Mendaftarkan custom element dengan nama <main-footer>
customElements.define('main-footer', MainFooter);

