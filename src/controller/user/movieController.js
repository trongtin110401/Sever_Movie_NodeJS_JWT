const db = require('../../configs/connectDB')

// Lấy danh sách phim
const getlistmovie = async(req,res) => {
    const [rows,fields] = await db.execute('select * from movie')
    return res.status(200).json({
        message:'ok',
        data: rows
    })
}

// Lấy danh sách phim theo thể loại
const getWithCategory = async (req,res) =>{
    const idcategory = req.body.idcategory
    const[rows,fields] = await db.execute('select * from movie where idcategory=?',[idcategory])
    return res.status(200).json({
        message:'ok',
        data: rows
    })
}
module.exports = {
    getlistmovie,getWithCategory
}