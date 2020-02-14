class ProxyFactory {

    static create(object, props, intercept) {
        return new Proxy(object, {
            get(target, prop, receiver) {
                const metodosParaInterceptar = props;
                
                if (metodosParaInterceptar.includes(prop) && ProxyFactory._isFuncao(target[prop])) {
                    return function() {
                        console.log(`Interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        return intercept(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
            }
        });
    }

    static _isFuncao(funcao) {
        return typeof(funcao) == typeof(Function);
    }
}