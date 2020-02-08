class NegociacoesView extends View {

    constructor(element) {
        super(element);
    }

    template(model) {
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
                    <tr>
                        <td colspan="3">Total</td>
                        <td>${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}</td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
}