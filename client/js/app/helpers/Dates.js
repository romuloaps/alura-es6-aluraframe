/**
 * Classe com métodos estáticos para manipulação de objetos Date
 */
class Dates {

    constructor() {
        throw new Error("Esta classe não pode ser instaciada!"); 
    }
    
    static parse(dateAsString) {
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateAsString)) {
            throw new Error("A data informada deve estar no formato dd/MM/aaaa");
        }

        return new Date(...dateAsString.split("/")
                                        .reverse()
                                        .map((item, index) => item - (index % 2))
                                        );
    }

    static format(date) {
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${day}/${month}/${date.getFullYear()}`;
    }
}