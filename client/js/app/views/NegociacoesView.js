class NegociacoesView {

    constructor(element) {
        this._element = element; 
    }

    update(model) {
        this._element.innerHTML = this._template(model);
    }

    _template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${model.negociacoes.map(negociacao => 
                        `
                            <tr>
                                <td>${Dates.format(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                                <td>${negociacao.volume}</td>
                            </tr>
                        `
                    ).join("")}
                </tbody>
                
                <tfoot>
                </tfoot>
            </table>
        `;
    }
}