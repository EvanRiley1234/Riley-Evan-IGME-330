class myFooter extends HTMLElement {
    constructor(){
        super();
        this.name = "Defualt Name";
        this.year = "2023";
    }

    static get observedAttributes(){
        return ["data-name", "data-year"];
    }

    connectCallback(){
        this.render();
    }

    attributeChangedCallback(attributeName, oldValue, newValue){
        console.log(attributeName, oldValue, newValue);
        if(oldValue === newValue) return;
        if(attributeName == "data-name"){
            this.name = newValue;
        }
        if(attributeName == "data-year"){
            this.year = newValue;
        }

        this.render();
    }

    render(){
        this.textContent = `${this.name} ${this.year}`
    }
}

customElements.define('my-footer', myFooter);