const user = require('../../datebase/user').user;
const crypto = require("crypto");

const md5 = str => crypto
		.createHash('md5')
		.update(str.toString())
		.digest('hex');

const existSameUser = (username) => {
    return user.find({ username }).value();
}

const doRegister = async (username, password) => {
    let item = {};
    item.username = username;
    item.password = md5(password);
    item.createDater = new Date().toLocaleDateString();
    return user.push(item).write();
}

const Register = async ({ request: req, response: res }) => {
    let item = req.body;
    let { username, password } = item;
    let body = null;

    if (existSameUser(username)) {
        body = {
            errno: 1,
            info: `${username} is exists`
        };
    } else {
        await doRegister(username, password);
        body = {
            errno: 0,
            info: 'success'
        };
    }

    res.status = 200;
    res.body = body;
}

module.exports = Register;