import {NegociacaoController} from "./app/controllers/NegociacaoController";

let  negociacaoController = new NegociacaoController();

document.querySelector(".form").addEventListener("onsubmit", negociacaoController.adiciona.bind(negociacaoController));
document.querySelector("#apagar").addEventListener("onclick", negociacaoController.apaga.bind(negociacaoController));