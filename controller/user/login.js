const user = require("../../datebase/user").user;
const crypto = require("crypto");

const md5 = str =>
  crypto
    .createHash("md5")
    .update(str.toString())
    .digest("hex");

const validUserName = (username) => {
    return user.find({ username }).value();
}

const validPassWord = (username, password) => {
    return user.find({ username, password }).value();
}

const loginValid = (username, password) => {
    let body = null;
    if (!validUserName(username)) {
        body = {
            info: 'username is not exists',
            errno: 1
        };
    } else if (!validPassWord(username, password)) {
        body = {
            info: 'password is wrong',
            errno: 1
        };
    } else {
        body = {
            info: 'success',
            errno: 0
        }
    }
    return body;
}

const Login = ({ request: req, response: res }) => {
    let { body: item } = req;
    let { username, password } = item;
    let body = null;

    password = md5(password);
    body = loginValid(username, password);
    res.status = 200;
    res.body = body;
}

module.exports = Login;