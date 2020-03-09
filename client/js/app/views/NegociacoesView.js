import {Dates} from "../helpers/index";
import {View} from "./View";
import {currentInstance} from "../controllers/NegociacaoController";

export class NegociacoesView extends View {

    constructor(element) {
        super(element);

        element.addEventListener("click", function(event) {
            if(event.target.nodeName == "TH") {
                currentInstance().ordena(event.target.getAttribute("data-sort"));
            }
        });
    }

    template(model) {
        return `
            <table class="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th data-sort="data">DATA</th>
                        <th data-sort="quantidade">QUANTIDADE</th>
                        <th data-sort="valor">VALOR</th>
                        <th data-sort="volume">VOLUME</th>
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
                        <td>${model.volumeTotal}</td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
}