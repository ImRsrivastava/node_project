const express = require("express");
const {body} = require("express-validator");
const AuthModule = require("./modules/AuthModule");
const UserModule = require("./modules/UserModule");
const BranchModule = require('./modules/BranchModule');
const Router = express.Router();
const Jwt = require('jsonwebtoken');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Verify Jwt Token function
const verifyJwtToken = async (req, res, next) => {
    const token = req.header('authorization').replace('Bearer ','');
    try {
        req.user = await Jwt.verify(token, AuthModule.JwtSecretKey);
        next();  }
    catch (error) {
        return res.status(401).json({'msg': 'Invalid token'});  }
}

// Web Router start here ************************************************************************************************
Router.post('/api/login', [
    body('email').notEmpty().withMessage('* Email should be required.'),
    body('password').notEmpty().withMessage('* Password should be required.')
], async (req, res) => {
    const loginStatus = await AuthModule.authenticateLogin(req, res);
});

Router.get('/api/auth', verifyJwtToken, (req, res) => {
    const {user} = req.user
    return res.json(user);
});

Router.get('/api/users/list', verifyJwtToken, async (req, res) => {
    const userList = await UserModule.getUsersList(req, res);
});

Router.post('/api/users/create', verifyJwtToken, [
    body('name').notEmpty().withMessage('* Name should be required.'),
    body('email').notEmpty().withMessage('* Email should be required.'),
    body('password').notEmpty().withMessage('* Password should be required.'),
    body('re_password').notEmpty().withMessage('* Rewrite Password should be required.')
], async (req, res) => {
    const createStatus = await UserModule.createUserInfo(req, res);
});

Router.delete('/api/users/:id', verifyJwtToken, async (req, res) => {
    await UserModule.deleteUserInfo(req, res);
});

Router.get('/api/users/:id', verifyJwtToken, async (req, res) => {
    await UserModule.editUserInfo(req, res);
});

Router.put('/api/users/:id', verifyJwtToken, async (req, res) => {
    const userId = req.params.id;
    console.log('check-userid-put:: ', userId);
    // await UserModule.updateUserInfo(req, res);
});




// Web Router end here **************************************************************************************************



// Admin Router start here **********************************************************************************************
Router.post('/api/admin/login',[
    body('email').notEmpty().withMessage('Email should be required.'),
    body('password').notEmpty().withMessage('Password should be required.')
], async (req, res) => {
    req.body.role = 1;
    const loginStatus = await AuthModule.authenticateLogin(req, res);
});

Router.get('/api/admin/auth', verifyJwtToken, (req, res) => {
    const {user} = req.user
    return res.json(user);
});

Router.get('/api/admin/branch/list', verifyJwtToken, (req, res) => {
    const getList = BranchModule.getAllBranchList(req, res);
})



// Admin Router end here ************************************************************************************************



module.exports = Router;

