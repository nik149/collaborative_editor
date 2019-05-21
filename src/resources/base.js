class Base {
    static get(req, res) {
        throw new Error("MethodNotImplemented");
    };

    static post(req, res) {
        throw new Error("MethodNotImplemented");
    }

    static put(req, res) {
        throw new Error("MethodNotImplemented");
    }
}

export default Base;