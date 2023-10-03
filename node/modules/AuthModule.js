const dbConnect = require('../connection/dbConnection');
const {validationResult} = require('express-validator');
const Jwt = require('jsonwebtoken');
const JwtSecretKey = 'reactTokenNode';       //  user define key, It is a secret key.
const misFunctions = require('../functions/Functions');


function authenticateLogin (req, res)
{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const validateErr = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {});
            return res.status(422).json({ errors: validateErr }); }

        else {
            let {email, password, role} = req.body;
            dbConnect.query("SELECT * FROM `auths` WHERE `email` = ? AND `role` = ?", [email, role], async (errs, rows) => {
                if(errs) {
                    return res.status(500).send(errs); }
                if(rows.length == 0) {
                    return res.status(500).json({msg: 'Unauthorized User. Try again'}); }

                let user = rows[0];
                let passCom = await misFunctions.bcryptPasswordCompare(password, user.password); // WILL RETURN TRUE OR FALSE
                if(passCom) {
                    const token = Jwt.sign({user}, JwtSecretKey, {expiresIn: '1h'});
                    return res.status(200).json({'token':token, 'user':user, 'msg':'Logged in successfully.'}); }

                if(!passCom) {
                    return res.status(401).json({msg: 'Authentication failed'}); }
            });
        }
    }
    catch (error) {
        return error; }
}


module.exports = {
    JwtSecretKey,
    authenticateLogin
}