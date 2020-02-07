class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView($("#negociacoes-view"));
        
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event) {
        event.preventDefault();

        this._negociacoes.adiciona(this._crieNegociacao());
        this._negociacoesView.update(this._negociacoes);
        this._limpeFormulario();

        console.log(this._negociacoes);
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