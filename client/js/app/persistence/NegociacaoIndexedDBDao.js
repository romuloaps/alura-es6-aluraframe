export class NegociacaoIndexedDBDao {

    constructor(connection) {
        this._connection = connection;
        this._store = "negociacoes";
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {

            let storeRequest = this._connection.transaction([this._store], "readwrite")
                                                .objectStore(this._store)
                                                .add(negociacao);
            storeRequest.onsuccess = e => {
                resolve();
            };
    
            storeRequest.onerror = e => {
                console.log(e.target.error);
                reject(`Não foi possível adicionar a negociação: ${e.target.error.name}`);
            };
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection.transaction([this._store], "readwrite")
                                        .objectStore(this._store)
                                        .openCursor();
            let negociacoes = [];

            cursor.onsuccess = e => {
                let line = e.target.result;
                if (line) {
                    let dado = line.value;

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    line.continue();
                     
                } else {
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject(`Error ao ler negociações: ${e.target.error.name}`)
            };
        });
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], "readwrite")
                                        .objectStore(this._store)
                                        .clear();
            
            request.onsuccess = e => resolve();

            request.onerror = e => {
                console.log(e.target.error);
                reject(`Error ao apagar negociações: ${e.target.error.name}`)
            };
        });
    }
}