import {Mensagem} from "../models/index";

/**
 * Classe com métodos estáticos para manipulação de Mensagem
 */
export class Mensagens {

    static sucesso(texto) {
        return new Mensagem(texto, Mensagem.SUCESSO);
    }

    static erro(texto) {
        return new Mensagem(texto, Mensagem.ERRO);
    }
}