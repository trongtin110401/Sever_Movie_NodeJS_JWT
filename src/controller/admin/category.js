const db = require('../../configs/connectDB')

// Thêm thể loại
const addCategory = async (req,res) => {
    let check = false
    let {name} = req.body
    if(!name) return res.status(202).json({message:'Vui lòng nhập tên thể loại'})
    const [rows,fields] = await db.execute('select * from category')
    const [id] = await db.execute('SELECT * FROM category ORDER BY idcategory desc limit 1')
    let newidcategory = id[0].idcategory + 1
    console.log(newidcategory)
    rows.map((n) => {
        if(n.name===name) check =!check
    })
    if(!check) {
        await db.execute('insert into category(idcategory,name) value (?,?)',[newidcategory,name])
        return res.status(200).json({
            message:'Thêm thể loại thành công'
        })
    }
    if(check) {
        return res.status(202).json({
            message: 'Thể loại đã tồn tại'
        })
    }
}

// Xóa thể loại
const deleteCategory = async(req,res) =>{
    let idcategory = req.body.idcategory
    if(!idcategory) return res.status(202).json({message:'Chọn thể loại cần xóa'})
    await db.execute('delete from category where idcategory=?',[idcategory])
    return res.status(200).json({
        message: 'Xóa thể loại thành công'
    })

}
module.exports = {
    addCategory,deleteCategory
}