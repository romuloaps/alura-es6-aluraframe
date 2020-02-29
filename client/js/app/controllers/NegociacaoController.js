class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        
        this._negociacoesView = new NegociacoesView($("#negociacoes-view"));
        this._mensagemView = new MensagemView($("#mensagem-view"));
        this._negociacaoService = new NegociacaoService();
        
        this._negociacoes = new Bind(new Negociacoes(), model => this._negociacoesView.update(model), "adiciona", "esvazia", "ordena");
        this._ordemAtual;

        this._init();
    }

    _init() {
        this._carregaNegociacoes();
        setInterval(() => this._importa(), 3000);
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacaoService.salva(this._crieNegociacao())
                                .then(negociacao => {
                                    this._negociacoes.adiciona(negociacao);
                                    this._mensagemView.update(Mensagens.sucesso("Negociação adicionada com sucesso!"));
                            
                                    this._limpeFormulario();
                                })
                                .catch(error => this._mensagemView.update(Mensagens.erro(error)));
    }

    apaga() {
        this._negociacaoService.apagaTodas()
                                .then(() => {
                                    this._negociacoes.esvazia();
                                    this._mensagemView.update(Mensagens.sucesso("Negociações apagadas com sucesso!"));
                                })
                                .catch(erro => this._mensagemView.update(Mensagens.erro(erro)));
    }

    ordena(coluna) {
        this._negociacoes.ordena((a, b) => a[coluna] - b[coluna], this._ordemAtual == coluna);
        this._ordemAtual = coluna;
    }

    _importa() {
        this._negociacaoService.importa(this._negociacoes.negociacoes)
                                .then(negociacoes => {
                                    negociacoes.forEach(n => this._negociacoes.adiciona(n));
                                    this._mensagemView.update(Mensagens.sucesso("Negociações importadas com sucesso!"));
                                })
                                .catch(error => this._mensagemView.update(Mensagens.erro(erro)));
    }

    _crieNegociacao() {
        return new Negociacao(
            Dates.parse(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpeFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    _carregaNegociacoes() {
        ConnectionFactory.getConnection()
                        .then(connection => new NegociacaoIndexedDBDao(connection))
                        .then(dao => dao.listaTodos())
                        .then(negociacoes => negociacoes.forEach(n => this._negociacoes.adiciona(n)));
    }
}