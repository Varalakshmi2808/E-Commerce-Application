let mongoose=require("mongoose")
let psch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "desc":String,
    "dct":Number,
    "price":Number,
    "pimg":String,
    "reviews":[]
})
let pm=new mongoose.model("prodmodel",psch)
module.exports=pm