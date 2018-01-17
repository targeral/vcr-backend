const user = require('../../datebase/user').user;
const crypto = require("crypto");

const md5 = str => crypto
		.createHash('md5')
		.update(str.toString())
		.digest('hex');

const existSameUser = (username) => {
    return user.find({ username }).value();
}

const doRegister = (username, password) => {
    let item = {};
    item.username = username;
    item.password = md5(password);
    item.createDater = new Date().toLocaleDateString();
    return user.push(item).write();
}

const Register = (username, password) => {
    let body = null;
    console.log(username, password)
    if (existSameUser(username)) {
        body = {
            errno: 1,
            info: `${username} is exists`
        };
    } else {
        doRegister(username, password);
        body = {
            errno: 0,
            info: 'success'
        };
    }
    return body;
}

module.exports = Register;