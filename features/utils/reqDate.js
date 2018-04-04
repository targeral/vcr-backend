const isEmptyObject = obj => Object.keys(obj).length === 0;

class ReqDate {
    constructor(request) {
        this.data = this._parse(request);
    }
    _parse(request) {
        let { query, body } = request;
        let ret = {};

        !isEmptyObject(query) && Object.assign(ret, {}, query);
        !isEmptyObject(body) && Object.assign(ret, {}, body);

        return ret;
    }

    get() {
        return this.data;
    }
}

module.exports = ReqDate
