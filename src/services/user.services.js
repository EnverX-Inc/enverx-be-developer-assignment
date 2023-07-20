const db = require('../../database/models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 5;
const SECRET = 'vgcvahgcfhsfd'

const postCredentials = async (username, password) => {

    const user = await db.user.findOne({ where: { username: username } })
    if (user) {
        throw new Error('username already exists');
    }

    password = await bcrypt.hash(password, SALT_ROUNDS);
    const newCredential = await db.user.create({ username: username, password: password })
    delete newCredential.dataValues.password;
    return newCredential;

}

const loginCredentials = async (username, password) => {
    const user = await db.user.findOne({ where: { username: username } })
    if (!user) {
        throw new Error('username does not exist');
    }

    const login = await bcrypt.compare(password, user.password);
    if(!login) {
        throw new Error('Incorrect Password');
    }

    return jwt.sign({ user: user.username }, SECRET ,{expiresIn:3600})
}

const validateToken = async (token) => {
    if (!token || typeof token !== 'string') {
        throw new Error('Invalid token format');
    }

    token = token.replace('Bearer ', '');

    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (error, decoded) => {
            if (error || !decoded) {
                reject(error || new Error('Invalid token'));
            }
            resolve(decoded);
        });
    });
};



module.exports = { postCredentials,loginCredentials,validateToken};