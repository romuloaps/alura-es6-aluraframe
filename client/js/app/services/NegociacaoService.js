import {HttpService} from "./HttpService";
import {Negociacao} from "../models/index";
import {ConnectionFactory, NegociacaoIndexedDBDao} from "../persistence/index";

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    _getNegociacoesDaSemana() {
        return this._fetchNegociacoes("semana", "Erro ao obter negociações da semana");
    }

    _getNegociacoesDaSemanaAnterior() {
        return this._fetchNegociacoes("anterior", "Erro ao obter negociações da semana anterior");
    }

    _getNegociacoesDaSemanaRetrasada() {
        return this._fetchNegociacoes("retrasada", "Erro ao obter negociações da semana retrasada");
    }

    _fetchAll() {
        return Promise.all([
            this._getNegociacoesDaSemana(),
            this._getNegociacoesDaSemanaAnterior(),
            this._getNegociacoesDaSemanaRetrasada()
        ])
        .then(negociacoes => negociacoes.reduce((listaGeral, listaAtual) => listaGeral.concat(listaAtual), []))
        .catch(erro => {throw new Error(erro)});
    }

    _fetchNegociacoes(endpoint, errorMessage) {
        return this._http.get(`negociacoes/${endpoint}`)
                        .then(negociacoes => negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)))
                        .catch(error => {
                            console.log(error);
                            throw new Error(errorMessage);
                        });
    }

    salva(negociacao) {
        return ConnectionFactory.getConnection()
                        .then(connection => new NegociacaoIndexedDBDao(connection))
                        .then(dao => dao.adiciona(negociacao))
                        .then(() => negociacao)
                        .catch(error => {
                            console.log(error);
                            throw new Error(`Erro ao salvar uma nova Negociação: ${error}`);
                        });
    }

    apagaTodas() {
        return ConnectionFactory.getConnection()
                        .then(connection => new NegociacaoIndexedDBDao(connection))
                        .then(dao => dao.apagaTodos())
                        .catch(error => {
                            console.log(error);
                            throw new Error(`Erro ao apagar todas as negociações: ${error}`)
                        });
    }

    importa(negociacoesAtual) {
        return this._fetchAll()
                    .then(negociacoes => negociacoes.filter(negociacao =>
                        !negociacoesAtual.some(negociacaoExistente => negociacao.equals(negociacaoExistente))))
                    .catch(error => {
                        console.log(error);
                        throw new Error(`Erro ao importar as negociações: ${error}`);
                    });
    }

    getAll() {
       return  ConnectionFactory.getConnection()
                        .then(connection => new NegociacaoIndexedDBDao(connection))
                        .then(dao => dao.listaTodos());
    }
}