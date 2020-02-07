class Dates {
    
    parse(dateAsString) {
        return new Date(...dateAsString.split("-")
                                             .map((item, index) => item - (index % 2))
                );
    }

    format(date) {
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${date.getDate()}/${month}/${date.getFullYear()}`;
    }
}