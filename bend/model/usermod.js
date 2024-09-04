let mongoose=require('mongoose')
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "phno":String,
    "place":String,
    "role":{
        type:String,
        default:"user"
    }

})
let um=new mongoose.model("usermod",usersch)
module.exports=um