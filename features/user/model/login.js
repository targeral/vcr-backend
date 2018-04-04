const { user }= require('../database');
const { md5 } = require('../../utils');

const validUserName = (username) => {
    return user.find({ username }).value();
}

const validPassWord = (username, password) => {
    return user.find({ username, password }).value();
}

const loginValid = (username, password) => {
    let ret = null;

    if (username.trim() === '' || password.trim() === '') {
        return {
            errno: 1,
            info: 'username or password is empty'
        };
    }

    if (!validUserName(username)) {
        ret = {
            info: 'username is not exists',
            errno: 1
        };
    } else if (!validPassWord(username, password)) {
        ret = {
            info: 'password is wrong',
            errno: 1
        };
    } else {
        ret = {
            info: 'success',
            errno: 0
        }
    }

    return ret;
}

module.exports = ({ 
    username, 
    password 
}) => loginValid(username, md5(password))
