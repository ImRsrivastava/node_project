const { validationResult } = require('express-validator');
const dbConnect = require('../connection/dbConnection');
const misFunctions = require('../functions/Functions');


function getAllBranchList (req, res)
{
    try {
        dbConnect.query("SELECT * FROM `branch` ORDER BY `id` DESC", (errs, rows) => {
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

function createNewBranch (req, res)
{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const validateErr = errors.array().reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc;
            }, {});
            return res.status(422).json(validateErr); }
        else {
            let {email} = req.body;
            dbConnect.query("SELECT * FROM `branch` WHERE `email` = ?", [email], async (errs, rows) => {
                if (errs) {
                    return res.status(500).json(errs); }
                if (rows.length > 0) {
                    return res.status(200).json({msg: 'Email is already in use, Try another email.'}); }
            });
        }
    }
    catch (er) {
        return res.status(500).json(er); }
}



module.exports = {
    getAllBranchList,
    createNewBranch
}