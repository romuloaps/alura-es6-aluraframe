/**
 * Representa um conjunto de negociações e manipula esse conjunto.
 */
class Negociacoes {

    constructor(onChange) {
        this._negociacoes = [];
        this._onChange = onChange;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._onChange(this);
    }

    esvazia() {
        this._negociacoes = [];
        this._onChange(this);
    }

    get negociacoes() {
        return this._negociacoes.slice();
    }
}