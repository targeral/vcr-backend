const isUndefined = value => value === undefined;

const isBoolean = value => value === true || value === false;

const getParams = request => request.query;

module.exports = {
    isUndefined,
    isBoolean,
    getParams
};