const db = require('../../configs/connectDB')

// Thêm phim
const addMovie = async(req,res) =>{
    const {name,img,url,idcategory} = req.body
    if(!name) return res.status(202).json({message:'Vui lòng nhập tên phim'})
    if(!img) return res.status(202).json({message:'Vui lòng nhập link ảnh phim'})
    if(!url) return res.status(202).json({message:'Vui lòng nhập link phim'})
    if(!idcategory) return res.status(202).json({message:'Vui lòng nhập thể loại phim'})
    await db.execute('insert into movie (name,img,url,idcategory) value (?,?,?,?)',[name,img,url,idcategory])
    return res.status(200).json({
        message:'Thêm phim thành công'
    })
}

// Cập nhật phim
const updateMovie = async(req,res) => {
    let check = false
    const {idmovie,name,img,url,idcategory} = req.body
    if(!idmovie) return res.status(202).json({message:'Vui lòng nhập mã phim'})
    if(!name) return res.status(202).json({message:'Vui lòng nhập tên phim'})
    if(!img) return res.status(202).json({message:'Vui lòng nhập link ảnh phim'})
    if(!url) return res.status(202).json({message:'Vui lòng nhập link phim'})
    if(!idcategory) return res.status(202).json({message:'Vui lòng nhập thể loại phim'})
    const [rows,fields] = await db.execute('select * from movie')
    rows.map((movie)=>{
        if(movie.idmovie===idmovie)
        check= !check
    })
    if(check) {await db.execute('UPDATE movie SET name = ?, img = ?, url = ?, idcategory = ? WHERE idmovie = ?',[name,img,url,idcategory,idmovie])

    return res.status(202).json({
        message:'Cập nhật phim thành công'
    })}
    if(!check) return res.status(202).json({message:'Không tìm thấy mã phim'})
}

// Xóa phim
const deleteMovie = async(req,res) => {
    let check = false
    const {idmovie} = req.body
    if(!idmovie) return res.status(202).json({message:'Vui lòng nhập mã phim'})
    const [rows,fields] = await db.execute('select * from movie')
    rows.map((movie)=>{
        if(movie.idmovie===idmovie)
        check= !check
    })
    if(check){
    await db.execute('DELETE FROM movie WHERE idmovie=?;',[idmovie])
    return res.status(200).json({
        message: 'Xóa phim thành công'
    })}
    if(!check) return res.status(202).json({message:'Không tìm thấy mã phim'})
}
module.exports = {
    addMovie,updateMovie,deleteMovie
}