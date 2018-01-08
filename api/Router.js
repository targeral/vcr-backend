class Router {
    constructor({ router, namespace = '/' }) {
        this.namespace = namespace;
        this.router = router;
    }
    get (path, cb) {
        let { router, namespace } = this;
        router.get(`${namespace}${path}`, cb);
    }
    post (path, cb) {
        let { router, namespace } = this;
        router.post(`${namespace}${path}`, cb);
    }
    put (path, cb) {
        let { router, namespace } = this;
        router.put(`${namespace}${path}`, cb);
    }
    del (path, cb) {
        let { router, namespace } = this;
        router.del(`${namespace}${path}`, cb);
    }
    all (path, cb) {
        let { router, namespace } = this;
        router.all(`${namespace}${path}`, cb);
    }
}

module.exports = Router;