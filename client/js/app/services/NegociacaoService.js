class NegociacaoService {

    getNegociacoesDaSemana() {
        return this._fetchNegociacoes("semana", "Erro ao obter negociações da semana");
    }

    getNegociacoesDaSemanaAnterior() {
        return this._fetchNegociacoes("anterior", "Erro ao obter negociações da semana anterior");
    }

    getNegociacoesDaSemanaRetrasada() {
        return this._fetchNegociacoes("retrasada", "Erro ao obter negociações da semana retrasada");
    }

    _fetchNegociacoes(endpoint, errorMessage) {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open("GET", `negociacoes/${endpoint}`);
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText).map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)));
    
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
    
            xhr.send();
        });
    }
}