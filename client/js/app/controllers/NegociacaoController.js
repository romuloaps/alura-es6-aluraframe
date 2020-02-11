class NegociacaoController {

    constructor() {
        let self = this;
        let $ = document.querySelector.bind(document);
        
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoesView = new NegociacoesView($("#negociacoes-view"));
        this._mensagemView = new MensagemView($("#mensagem-view"));
        
        this._negociacoes = new Proxy(new Negociacoes(), {
            get(target, prop, receiver) {
                const metodosParaInterceptar = ["adiciona", "esvazia"];
                
                if (metodosParaInterceptar.includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    return function() {
                        console.log(`Interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
            }
        });
        
        this._negociacoesView.update(this._negociacoes);
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