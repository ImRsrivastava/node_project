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



module.exports = {
    getAllBranchList
}