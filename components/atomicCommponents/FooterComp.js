class Footer extends HTMLElement{
    constructor(){
        super();
    }

    async connectedCallback(){
        const content = await this.getFooter();

        this.innerHTML = content;
    }

    async getFooter(){
        const htmlnya = await fetch("../../components/footer.html");

        const data = await htmlnya.text();

        return data;
    }
}


customElements.define("footer-element", Footer);