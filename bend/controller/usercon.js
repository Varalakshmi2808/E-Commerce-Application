let um=require('../model/usermod')
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')

let add=async(req,res)=>{
    try{
        let result=await um.findById({"_id":req.body._id})
        if(result){
            res.json({"msg":"user already exists"})
        }
        else{   
            let hash=await bcrypt.hash(req.body.pwd,10)
            let data=new um({...req.body,"pwd":hash})
            data.save()
            res.json({"msg":"registration successful"})
        }
    }
    catch(err){
        console.log(err)
    }
    
}
let login=async(req,res)=>{
    try {
        let data=await um.findById({"_id":req.body._id})
        if(data){
            let f=await bcrypt.compare(req.body.pwd,data.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":req.body._id},"fsd4"),"name":data.name,"_id":data._id,"role":data.role})
            }
            else{
                res.json({"msg":"check password"})
            }
        }
        else{
            res.json({"msg":"check email"})
        }
    } catch (error) {
        
    }
}
let getuser=async(req,res)=>{
    try {
        let data=await um.findById({"_id":req.params._id})
        res.json(data)
    } catch (error) {
        
    }
}
let islogin=(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"fsd4")
        next()
    }
    catch(err)
    {
        res.json({"msg":"login to get det"})
    }
}
let isadmin=async(req,res,next)=>{
    try{
       let x= await umodel.findById({"_id":req.headers.uid})
        if(x&&x.role=="admin")
        {
            next()
        }
        else
        {
            res.json({"msg":"you are not admin"})
        }
    }
    catch(err)
    {

    }

}

module.exports={add,login,getuser,islogin,isadmin}