const dbName = "aluraframe";
const dbVersion = 4;
const stores = ["megociacoes"];

var connection;
var closeFunction;

export class ConnectionFactory {

    constructor() {
        throw new Error("Não é possível criar instância de ConnectionFactory");
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, dbVersion);
            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
                if (!connection) {
                    connection = e.target.result;
                    closeFunction = connection.close.bind(connection);
                    connection.close = () => {
                        throw new Error("A conexão não pode ser fechada diretamente");
                    }
                }
                resolve(connection);
            };

            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }

    static _createStores(connection) {
        stores.forEach(s => {
                
            if (connection.objectStoreNames.contains(s)) {
                connection.deleteObjectStore(s);
            }
            connection.createObjectStore(s, {
                autoIncrement: true
            });
        });
    }

    static closeConnection() {
        if (connection) {
            closeFunction();
            connection = null;
        }
    }
}