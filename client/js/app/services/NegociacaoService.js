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

    salva(negociacao) {
        return ConnectionFactory.getConnection()
                        .then(connection => new NegociacaoIndexedDBDao(connection))
                        .then(dao => dao.adiciona(negociacao))
                        .then(() => negociacao)
                        .catch(error => {
                            console.log(error);
                            throw new Error(`Erro ao salvar uma nova Negociação: ${error}`);
                        });
    }

    apagaTodas() {
        return ConnectionFactory.getConnection()
                        .then(connection => new NegociacaoIndexedDBDao(connection))
                        .then(dao => dao.apagaTodos())
                        .catch(error => {
                            console.log(error);
                            throw new Error(`Erro ao apagar todas as negociações: ${error}`)
                        });
    }

    importa(negociacoesAtual) {
        return this.getAll()
                    .then(negociacoes => negociacoes.filter(negociacao =>
                        !negociacoesAtual.some(negociacaoExistente => negociacao.equals(negociacaoExistente))))
                    .catch(error => {
                        console.log(error);
                        throw new Error(`Erro ao importar as negociações: ${error}`);
                    });
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