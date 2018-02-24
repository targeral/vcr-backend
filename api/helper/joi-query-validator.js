const Joi = require('joi');
const { isUndefined, isBoolean, getParams } = require('./util');

const toJoiSchema = (options) => {
    let { entries } = Object;
    let { type, ...otherLimit } = options;
    if (isUndefined(type)) {
        throw Error(`'type' key has not found.`);
    }

    let joi = Joi[type]();
    for (let [key, value] of entries(otherLimit)) {
        joi = isBoolean(value) ? joi[key]() : joi[key](value);
    }
    return joi;
}

const schemaParser = (options) => {
    let schema = {};
    let { keys } = Object;
    keys(options).forEach(key => schema[key] = toJoiSchema(options[key]));
    return Joi.object(schema);
}

const validator = (schema) => {
    return (ctx, next) => {
        const { request, response } = ctx;
        let params = getParams(request);
        Joi.validate(params, schemaParser(schema), (err, value) => {
            if (!err) {
                next();
            } else {
                ctx.throw(400, err);
            }
        });
    }
};

module.exports = validator;