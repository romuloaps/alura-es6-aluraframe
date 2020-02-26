class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    getNegociacoesDaSemana() {
        return this._fetchNegociacoes("semana", "Erro ao obter negociações da semana");
    }

    getNegociacoesDaSemanaAnterior() {
        return this._fetchNegociacoes("anterior", "Erro ao obter negociações da semana anterior");
    }

    getNegociacoesDaSemanaRetrasada() {
        return this._fetchNegociacoes("retrasada", "Erro ao obter negociações da semana retrasada");
    }

    getAll() {
        return Promise.all([
            this.getNegociacoesDaSemana(),
            this.getNegociacoesDaSemanaAnterior(),
            this.getNegociacoesDaSemanaRetrasada()
        ])
        .then(negociacoes => negociacoes.reduce((listaGeral, listaAtual) => listaGeral.concat(listaAtual), []))
        .catch(erro => {throw new Error(erro)});
    }

    _fetchNegociacoes(endpoint, errorMessage) {
        return this._http.get(`negociacoes/${endpoint}`)
                        .then(negociacoes => negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)))
                        .catch(error => {
                            console.log(error);
                            throw new Error(errorMessage);
                        });
    }
}