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

class FilterDropdown {
  constructor() {
    this.activeMenu = null;
    this.init();
  }

  init() {
    // Setup event listeners for each filter button
    const filters = [
      { btn: 'ratingBtn', menu: 'ratingMenu', icon: 'ratingIcon' },
      { btn: 'kotaBtn', menu: 'kotaMenu', icon: 'kotaIcon' },
      { btn: 'kategoriBtn', menu: 'kategoriMenu', icon: 'kategoriIcon' },
      { btn: 'hargaBtn', menu: 'hargaMenu', icon: 'hargaIcon' }
    ];

    filters.forEach(({ btn, menu, icon }) => {
      const button = document.getElementById(btn);
      const dropdown = document.getElementById(menu);
      const arrowIcon = document.getElementById(icon);

      if (button && dropdown) {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleMenu(menu, icon, button);
        });

        // Add click listeners to menu items
        dropdown.querySelectorAll('.filter-option').forEach(item => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            this.selectOption(button, item.textContent.trim(), item.getAttribute('data-value'));
            this.closeAllMenus();
          });
        });
      }
    });

    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearAllFilters());
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => this.closeAllMenus());
    
    // Close dropdowns when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeAllMenus();
    });
  }

  toggleMenu(menuId, iconId, button) {
    const menu = document.getElementById(menuId);
    const icon = document.getElementById(iconId);
    
    // If this menu is already active, close it
    if (this.activeMenu === menuId) {
      this.closeMenu(menu, icon, button);
      this.activeMenu = null;
      return;
    }
    
    // Close any open menu first
    this.closeAllMenus();
    
    // Open the clicked menu
    this.openMenu(menu, icon, button);
    this.activeMenu = menuId;
  }

  openMenu(menu, icon, button) {
    if (!menu || !icon) return;
    
    menu.classList.remove('hidden', 'opacity-0', 'translate-y-1');
    menu.classList.add('block', 'opacity-100', 'translate-y-0');
    icon.classList.remove('rotate-0');
    icon.classList.add('rotate-180');
    
    // Add active state to button
    if (button) {
      button.classList.add('border-gray-400', 'bg-gray-100', 'text-gray-800');
      button.classList.remove('border-gray-300', 'bg-white');
    }
  }

  closeMenu(menu, icon, button) {
    if (!menu || !icon) return;
    
    menu.classList.remove('block', 'opacity-100', 'translate-y-0');
    menu.classList.add('hidden', 'opacity-0', 'translate-y-1');
    icon.classList.remove('rotate-180');
    icon.classList.add('rotate-0');
    
    // Remove active state from button
    if (button) {
      button.classList.remove('border-gray-400', 'bg-gray-100', 'text-gray-800');
      button.classList.add('border-gray-300', 'bg-white');
    }
  }

  closeAllMenus() {
    const menus = ['ratingMenu', 'kotaMenu', 'kategoriMenu', 'hargaMenu'];
    const icons = ['ratingIcon', 'kotaIcon', 'kategoriIcon', 'hargaIcon'];
    const buttons = ['ratingBtn', 'kotaBtn', 'kategoriBtn', 'hargaBtn'];
    
    menus.forEach((menuId, index) => {
      const menu = document.getElementById(menuId);
      const icon = document.getElementById(icons[index]);
      const button = document.getElementById(buttons[index]);
      
      if (menu && icon) {
        this.closeMenu(menu, icon, button);
      }
    });
    
    this.activeMenu = null;
  }

  selectOption(button, text, value) {
    if (!button) return;
    
    // Update button text to show selection
    const originalText = button.id.replace('Btn', '');
    const buttonText = button.querySelector('span') || button.firstChild;
    
    // Create new content for button
    button.innerHTML = `
      <span class="font-medium">${text}</span>
      <svg class="w-4 h-4 ml-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    `;
    
    // Get the new icon element
    const newIcon = button.querySelector('svg');
    if (newIcon) {
      newIcon.id = button.id.replace('Btn', 'Icon');
      newIcon.classList.add('text-gray-400');
    }
    
    // Add visual feedback for active filter
    button.classList.add('bg-blue-50', 'border-blue-200', 'text-blue-600', 'font-medium');
    button.classList.remove('text-gray-600', 'border-gray-300', 'hover:bg-gray-50');
    
    // Store the selected value as data attribute
    button.setAttribute('data-selected', value);
    
    console.log(`Filter selected: ${button.id} = ${value}`);
  }

  clearAllFilters() {
    const buttons = ['ratingBtn', 'kotaBtn', 'kategoriBtn', 'hargaBtn'];
    const defaultTexts = {
      'ratingBtn': 'Rating',
      'kotaBtn': 'Kota',
      'kategoriBtn': 'Kategori',
      'hargaBtn': 'Harga'
    };
    
    buttons.forEach(btnId => {
      const button = document.getElementById(btnId);
      if (button) {
        // Reset button text
        button.innerHTML = `
          ${defaultTexts[btnId]}
          <svg id="${btnId.replace('Btn', 'Icon')}" class="w-4 h-4 ml-1 text-gray-400 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        `;
        
        // Reset button styling
        button.classList.remove('bg-blue-50', 'border-blue-200', 'text-blue-600', 'font-medium');
        button.classList.add('border-gray-300', 'bg-white', 'text-gray-600', 'hover:bg-gray-50');
        
        // Remove selected data
        button.removeAttribute('data-selected');
      }
    });
    
    console.log('All filters cleared');
  }
}

// Initialize the filter dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FilterDropdown();
});

document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === "Enter") {
    window.location.href = "/hasilsearch.html"
  }
});

