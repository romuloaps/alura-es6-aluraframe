/**
 * Classe com métodos estáticos para manipulação de objetos Date
 */
class Dates {

    constructor() {
        throw new Error("Esta classe não pode ser instaciada!"); 
    }
    
    static parse(dateAsString) {
        if (!/\d{4}-\d{2}-\d{2}/.test(dateAsString)) {
            throw new Error("A data informada deve estar no formato aaaa-mm-dd");
        }

        return new Date(...dateAsString.split("-")
                                             .map((item, index) => item - (index % 2))
                );
    }

    static format(date) {
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${date.getDate()}/${month}/${date.getFullYear()}`;
    }
}