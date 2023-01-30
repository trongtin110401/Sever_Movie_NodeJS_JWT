'use strict';
const express = require('express')
const jwt = require('jsonwebtoken')
let productsCtrl = require('../controller/user/userControllers');
const route = express.Router();
const verifyToken = require('../../jwt/auth')


route.get('/user',verifyToken,productsCtrl.get)
route.delete('/logout',verifyToken,productsCtrl.logout)



module.exports = route