class Navbar extends HTMLElement{
    constructor(){
        super();
    }

    async connectedCallback(){
        const content = await this.getNavbar();
        this.innerHTML = content;
    }


    getNavbar = async() =>{
        let html = await fetch("../components/navbar.html");
        let data = await html.text();

        return data;
    }
}


customElements.define('navbar-element', Navbar);