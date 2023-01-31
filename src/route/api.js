'use strict';
const express = require('express')
const jwt = require('jsonwebtoken')
const userController = require('../controller/user/userControllers');
const movieController = require('../controller/user/movieController');
const adMovie = require('../controller/admin/movie');
const adCategory = require('../controller/admin/category');
const route = express.Router();
const verifyToken = require('../../jwt/auth')

// api account
route.get('/user',verifyToken,userController.get)
route.delete('/logout',verifyToken,userController.logout)
route.post('/register',userController.register)

// api movie
route.get('/movie',verifyToken,movieController.getlistmovie)
route.post('/category',verifyToken,movieController.getWithCategory)

// api admin movie
route.post('/addmovie',verifyToken,adMovie.addMovie)
route.put('/updatemovie',verifyToken,adMovie.updateMovie)
route.delete('/deletemovie',verifyToken,adMovie.deleteMovie)

// api admin category
route.post('/addcategory',verifyToken,adCategory.addCategory)
route.delete('/deletecategory',verifyToken,adCategory.deleteCategory)

module.exports = route