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
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._crieNegociacao());
        this._mensagemView.update(Mensagens.sucesso("Negociação adicionada com sucesso!"));

        this._limpeFormulario();
    }

    importa() {
        this._negociacaoService.getAll()
                                .then(negociacoes => {
                                    negociacoes.forEach(n => this._negociacoes.adiciona(n));
                                    this._mensagemView.update(Mensagens.sucesso("Negociações importadas com sucesso!"));
                                })
                                .catch(erro => this._mensagemView.update(Mensagens.erro(erro)));
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagemView.update(Mensagens.sucesso("Negociações apagadas com sucesso!"));
    }

    ordena(coluna) {
        this._negociacoes.ordena((a, b) => a[coluna] - b[coluna], this._ordemAtual == coluna);
        this._ordemAtual = coluna;
    }

    _crieNegociacao() {
        return new Negociacao(
            Dates.parse(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpeFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}