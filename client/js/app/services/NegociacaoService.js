class NegociacaoService {

    getNegociacoesDaSemana(onSuccess, onError) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", "negociacoes/semana");
        xhr.onreadystatechange = () => {
            
            if (xhr.readyState == 4 && xhr.status == 200) {
                let listaDeNegociacoes = JSON.parse(xhr.responseText);

                onSuccess(listaDeNegociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor)));

            } else {
                console.log(xhr.responseText);
                onError(xhr.responseText);
            }
        };

        xhr.send();
    }
}