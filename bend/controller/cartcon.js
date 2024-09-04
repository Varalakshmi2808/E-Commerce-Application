let cm=require("../model/cmod")
let {v4:uuid}=require("uuid")
const pm = require("../model/pmod")

let addcart=async(req,res)=>{
    try {
        let items=await cm.find({"uid":req.body.uid,"pid":req.body.pid})
        if(items.length==0){
            let newdata=new cm({...req.body,"_id":uuid()})
            newdata.save()
            res.json({"msg":"item added to cart"})
        }
        else{
            await cm.findByIdAndUpdate({"_id":items[0]._id},{$inc:{"qty":1}})
        }
        res.json({"msg":"item added to cart"})
    } catch (error) {
        
    }
}

let getcart=async(req,res)=>{
    try {
        let data=await cm.find({"uid":req.params.uid})
        res.json(data)
    } catch (error) {
        
    }
}
let delcart=async(req,res)=>{
    try {
        await cm.findByIdAndDelete({"_id":req.params._id})
        res.json({"msg":"cart deleted"})
    } catch (error) {
        
    }
}

let incqty=async(req,res)=>{
    try {
        await cm.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":1}})
        res.json({"msg":"incremented"})
    } catch (error) {
        
    }
}
let decqty=async(req,res)=>{
    try {
        await cm.findByIdAndUpdate({"_id":req.body._id},{$inc:{"qty":-1}})
        res.json({"msg":"incremented"})
    } catch (error) {
        
    }
}
module.exports={addcart,getcart,delcart,incqty,decqty}