'use strict'
const util = require('util')
const db = require('../../configs/connectDB')

// Lấy thông tin người dùng
const get = async (req, res) => {
       
        const Account = req.Account;
        const[rows,fields]= await db.execute('SELECT * FROM user where Account=?',[Account])
        return res.status(200).json({
            message:'ok',
            data:rows
        })
    }

// Đăng Xuất
const logout = async(req,res) =>{
        const Account = req.Account
        const refreshToken = null
        db.execute('update user set refreshToken=? where Account = ?',[refreshToken,Account]);
        return res.status(200).json({
            message: 'logout ok' 
        })
}

// Đăng kí
const register = async(req,res) =>{
    let checkAccount = false;
    const {Account,Password,Phone} = req.body;
    if(!Account) return res.status(202).json({
        message:'Vui lòng nhập tài khoản'
    })
    if(!Password) return res.status(202).json({
        message:'Vui lòng nhập mật khẩu'
    })
    if(!Phone) return res.status(202).json({
        message:'Vui lòng nhập nhập số điện thoại'
    })
    const [rows,fields]= await db.execute('SELECT * FROM user')
    rows.map((user)=>{
        if(user.Account===Account){
            checkAccount = true;
        }
    })
    if(checkAccount) return res.status(202).json({
        message: 'Tài khoản đã tồn tại'
    })
    await db.execute('INSERT INTO user (Account, Password,Phone) VALUES (?, ?, ?)',[Account,Password,Phone])
    return res.status(200).json({
        message: 'Đăng kí thành công'
    })
}
module.exports = {
    get,logout,register
}
