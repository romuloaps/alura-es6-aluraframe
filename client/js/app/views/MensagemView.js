class MensagemView {

    constructor(element) {
        this._element = element; 
    }

    update(model) {
        this._element.innerHTML = this._template(model);
    }

    _template(model) {
        return `<p class="alert alert-${model.tipo}">${model.texto}</p>`;
    }
}