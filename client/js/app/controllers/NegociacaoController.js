class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoesView = new NegociacoesView($("#negociacoes-view"));
        this._mensagemView = new MensagemView($("#mensagem-view"));
        
        this._negociacoes = new Bind(new Negociacoes(), model => this._negociacoesView.update(model), "adiciona", "esvazia");
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._crieNegociacao());
        this._mensagemView.update(Mensagens.sucesso("Negociação adicionada com sucesso!"));

        this._limpeFormulario();
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagemView.update(Mensagens.sucesso("Negociações apagadas com sucesso!"));
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