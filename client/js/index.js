import {currentInstance} from "./app/controllers/NegociacaoController";

let  negociacaoController = currentInstance();

document.querySelector(".form").addEventListener("submit", negociacaoController.adiciona.bind(negociacaoController));
document.querySelector("#apagar").addEventListener("click", negociacaoController.apaga.bind(negociacaoController));