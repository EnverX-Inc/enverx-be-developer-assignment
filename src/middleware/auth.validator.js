const axios = require('axios');

const validate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ message: 'missing token', validated: false });
    }
    try {
        const userData = await axios({
            baseURL: 'http://localhost:3000',
            url: 'user/token/validate',
            method: 'get',
            headers: {
                Authorization: token,
            },
        });
        req.id = userData.data.id;
        next();
    } catch (err) {
        res.json({ message: 'authentication issue' });
    }
    
};

module.exports = { validate };
