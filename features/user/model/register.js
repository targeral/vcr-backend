const { user } = require('../database');
const { md5 } = require('../../utils');

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

module.exports = ({ username, password }) => {
    let ret = null;

    if (username.trim() === '' || password.trim() === '') {
        return {
            errno: 1,
            info: 'username or password is empty'
        };
    }

    if (existSameUser(username)) {
        ret = {
            errno: 1,
            info: `${username} is exists`
        };
    } else {
        doRegister(username, password);
        ret = {
            errno: 0,
            info: 'success'
        };
    }

    return ret;
}
