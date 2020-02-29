class NegociacaoIndexedDBDao {

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
}