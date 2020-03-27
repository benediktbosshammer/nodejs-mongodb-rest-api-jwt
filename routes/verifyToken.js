const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({
        message: "Access denied"
    });

    const verified = jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token'})
        req.user = user
        next()
    });
};