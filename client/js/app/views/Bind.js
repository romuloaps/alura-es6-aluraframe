class Bind {

    /**
     * Retorna uma instância de Proxy
     * 
     * @param {*} model 
     * @param {*} onChange 
     * @param {*} modelProps 
     */
    constructor(model, onChange, ...modelProps) {
        let proxy = ProxyFactory.create(model, modelProps, onChange);
        onChange(model);

        return proxy;
    }
}