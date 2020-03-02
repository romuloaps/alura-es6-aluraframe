export class Mensagem {

    constructor(texto = "", tipo = "success") {
        this._texto = texto;
        this._tipo = tipo;
    }

    get texto() {
        return this._texto;
    }

    get tipo() {
        return this._tipo;
    }

    static get SUCESSO() {
        return "success";
    }

    static get ERRO() {
        return "danger";
    }
}