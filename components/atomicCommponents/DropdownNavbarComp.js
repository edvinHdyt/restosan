class DropdownNavbar extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        const res = await fetch("../../components/dropdown_navbar_comp.html");
        const data = await res.text();


        this.innerHTML = data;
    }
}

customElements.define("dropdown-navbar", DropdownNavbar);