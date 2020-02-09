/**
 * Classe com métodos estáticos para manipulação de Mensagem
 */
class Mensagens {

    static sucesso(texto) {
        return new Mensagem(texto, Mensagem.SUCESSO);
    }

    static erro(texto) {
        return new Mensagem(texto, Mensagem.ERRO);
    }
}