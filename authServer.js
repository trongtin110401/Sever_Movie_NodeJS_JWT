const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const util = require('util')
const mysql = require('mysql')
const db = require('./src/configs/connectDB')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const generateTokens = payload =>{
    const {Account} = payload
    console.log({Account:Account})
    const accessToken = jwt.sign({Account:Account},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "5m"
    })
    const refreshToken = jwt.sign({Account:Account},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "1h"
    })
    return {accessToken,refreshToken}
}

const updateRefreshToken = async (Account,refreshToken) =>{
    await db.execute('update user set refreshToken=? where Account = ?',
        [refreshToken,Account]);
}
app.post('/login',async (req,res)=>{
    const Account = req.body.Account;
    const Password = req.body.Password;

    if(!Account){
        return res.status(401).json({
            message:' Vui lòng nhập tài khoản'
        })
    }

    if(!Password){
        return res.status(401).json({
            message:' Vui lòng nhập mật khẩu'
        })
    }

    const[rows,fields] = await db.execute('SELECT * FROM user WHERE Account=? and Password=?',[Account,Password]);

    console.log(rows);
    if(rows.length===0){
        return res.status(401).json({
            message:'not found'
        }    
        )
    }
    const token = generateTokens({Account:Account})
    updateRefreshToken(Account,token.refreshToken)
    return res.status(200).json({
        message:'ok',
        token
    })
})

app.post('/token',async (req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(!refreshToken) return res.sendStatus(401);
    const[rows,fields] = await db.execute('SELECT * FROM user WHERE refreshToken=?',[refreshToken]);
    if(rows.length===0) return res.sendStatus(403)
    try {
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        const token =  generateTokens({Account:rows[0].Account})
        updateRefreshToken(rows[0].Account,token.refreshToken)
        return res.json(token)
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }

})

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})


app.listen(port)

console.log('RESTful API server started on: ' + port)
    