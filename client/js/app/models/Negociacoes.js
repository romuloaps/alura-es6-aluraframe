/**
 * Representa um conjunto de negociações e manipula esse conjunto.
 */
class Negociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return this._negociacoes.slice();
    }
}