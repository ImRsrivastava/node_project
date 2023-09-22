const express = require("express");
const {body} = require("express-validator");
const Router = express.Router();
const Jwt = require('jsonwebtoken');

const verifyJwtToken = async (req, res, next) => {
    const token = req.header('authorization').replace('Bearer ','');
    try {
        req.user = await Jwt.verify(token, AuthModule.JwtSecretKey);
        next();  }
    catch (error) {
        return res.status(401).json({'msg': 'Invalid token'});  }
}


module.exports = Router;