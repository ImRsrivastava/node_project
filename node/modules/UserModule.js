const dbConnect = require('../connection/dbConnection');
const {validationResult} = require('express-validator');
const misFunctions = require('../functions/Functions');


async function getUsersList (req, res) {
    try {
        dbConnect.query("SELECT * FROM `users` WHERE `role` = 2 ORDER BY `id` DESC", (errs, rows) => {
            if(errs) {
                return res.status(500).json(errs); }
            if(rows.length == 0) {
                return res.status(200).send(rows); }
            if(rows.length > 0) {
                return res.status(200).send(rows); }
        }); }
    catch (er) {
        return res.status(500).json(er); }
}

async function createUserInfo (req, res) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const validateErr = errors.array().reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc; }, {});
            return res.status(422).json(validateErr); }
        else {
            const {name, email, password, re_password} = req.body;
            const capName = await name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            if(password === re_password) {
                const bPassword = await misFunctions.bcryptPassword(password);
                const role = 2;
                dbConnect.query("SELECT * FROM `users` WHERE `email` = ?", email, (e, r) => {
                    if(e) { return res.status(500).json({msg: e}); }
                    if(r.length == 0) {
                        dbConnect.query(
                            "INSERT INTO `users` (`name`,`email`,`password`,`role`,`created_at`,`updated_at`) VALUES (?, ?, ?, ?, ?, ?)",
                            [capName, email, bPassword, role, new Date(), new Date()], (errs, rows) => {
                                if(errs) {
                                    return res.status(500).json({msg: errs}); }
                                if(rows) {
                                    return res.status(201).json({msg: 'User created successfully.'}); }
                        } );
                    }
                    else if(r.length > 0) {
                        return res.status(500).json({msg: '* Email already taken by someone else. Try again with another email.'});  }
                });
            }
            else {
                return res.status(500).json({msg: '* Rewrite Password should be equal to password.'});  }
        }
    }
    catch (e) {
        return res.status(500).json({msg: e}); }
}

// async function createUserInfo (req, res) {
//     try {
//         // const errors = validationResult(req);
//         // if(!errors.isEmpty()) {
//         //     const validateErr = errors.array().reduce((acc, err) => {
//         //         acc[err.path] = err.msg;
//         //         return acc; }, {});
//         //     return res.status(422).json(validateErr); }
//         // else {
//         //     const {name, email, password, re_password} = req.body;
//         //     if(password === re_password) {
//         //         const bPassword = await misFunctions.bcryptPassword(password);
//         //         const role = 2;
//         //         dbConnect.query(
//         //             "INSERT INTO `users` (`name`,`email`,`password`,`role`,`created_at`,`updated_at`) VALUES (?, ?, ?, ?, ?, ?)",
//         //             [name, email, bPassword, role, new Date(), new Date()], (errs, rows) => {
//         //                 if(errs) {
//         //                     return res.status(500).json({msg: errs}); }
//         //                 if(rows) {
//         //                     return res.status(201).json({msg: 'User created successfully.'}); }
//         //             } );
//         //     }
//         //     else {
//         //         res.status(500).json({msg: '* Rewrite Password should be equal to password.'});  }
//         // }
//     }
//     catch (e) {
//         return res.status(500).json(e); }
// }

async function deleteUserInfo (req, res) {
    try {
        const userId = Buffer.from(Buffer.from(req.params.id, 'base64').toString(), 'base64').toString();
        const role = 2;
        dbConnect.query("SELECT * FROM `users` WHERE `id` = ? AND `role` = ?", [userId, role], (errs, rows) => {
            if(errs) {
                return res.status(500).send({msg: '* '+errs.sqlMessage});   }
            if(rows.length == 0) {
                return res.status(500).send({msg: '* No appropriate record found, Try again.'});  }
            if(rows.length > 0) {
                dbConnect.query("DELETE FROM `users` WHERE `id` = ? AND `role` = ?", [userId, role], (dErrs, dRows) => {
                    if(dErrs) {
                        return res.status(500).send({msg: '* '+dErrs.sqlMessage});  }
                    if(dRows) {
                        return res.status(200).send({msg: '* User information deleted successfully.'});  }
                });
            }
        });
    }
    catch (e) {
        return res.status(500).json({msg: e}); }
}

async function editUserInfo (req, res) {
    try {
        const userId = Buffer.from(Buffer.from(req.params.id, 'base64').toString(), 'base64').toString();
        const role = 2;
        dbConnect.query("SELECT `id`,`name`,`email` FROM `users` WHERE `id` = ? AND `role` = ?", [userId, role], (errs, rows) => {
            if(errs) {
                return res.status(500).send({msg: '* '+errs.sqlMessage});   }
            if(rows.length == 0) {
                return res.status(500).send({msg: '* No appropriate record found, Try again.'});  }

            if(rows.length > 0) {
                return res.status(200).send(rows);  }
        });
    }
    catch (e) {
        return res.status(500).send({msg: e});  }
}

async function updateUserInfo(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const validateErr = errors.array().reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc }, {});
        return res.status(422).json(validateErr);
    }
    else {
        const {editName, editEmail} = req.body;
        
    }
}


module.exports = {
    getUsersList, createUserInfo, deleteUserInfo, editUserInfo, updateUserInfo
}