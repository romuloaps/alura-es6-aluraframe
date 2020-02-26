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

    esvazia() {
        this._negociacoes = [];
    }

    ordena(criterio, inverteOrdem) {
        if (inverteOrdem) {
            this._negociacoes.reverse();
        
        } else {
            this._negociacoes.sort(criterio);
        }
    }



    get negociacoes() {
        return this._negociacoes.slice();
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}