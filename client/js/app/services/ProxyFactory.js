class ProxyFactory {

    static create(object, props, intercept) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                const metodosParaInterceptar = props;
                
                if (metodosParaInterceptar.includes(prop) && ProxyFactory._isFuncao(target[prop])) {
                    return function() {
                        console.log(`Interceptando ${prop}`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        intercept(target);

                        return retorno;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    intercept(target);    
                }
                return retorno;
            }
        });
    }

    static _isFuncao(funcao) {
        return typeof(funcao) == typeof(Function);
    }
}