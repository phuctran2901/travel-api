const jwt = require('jsonwebtoken');

exports.checkCurrentUser = (req, res, next) => {
    const Authorization = req.header('Authorization');
    if (!Authorization) {
        req.user = null;
        next();
    }
    else {
        try {
            const token = Authorization.replace('Bearer ', '');
            const { userID } = jwt.verify(token, process.env.APP_SECERT);
            req.user = { userID };
            next();
        }
        catch (err) {
            req.user = null;
            next();
        }
    }

}