let pm=require("../model/pmod")
let multer=require("multer")
let {v4:uuid}=require("uuid")
let fs=require("fs")
let nodemailer=require("nodemailer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
const upload = multer({ storage: storage })

let addprod=async(req,res)=>{
    try {
        if(['jpeg','jpg','png'].includes(req.file.mimetype.split("/")[1])){
        let data=await pm({...req.body,"pimg":req.file.filename,"_id":uuid()})
        data.save()
        res.json({"msg":"prod added"})
        }
        else{
            fs.rm(`./prodimgs/${req.file.filename}`,()=>{})
            res.json({"msg":"only jpg.jpeg,png files are accepted"})
        }
    } catch (error) {
        console.log(error)
    }
}

let getprod=async(req,res)=>{
    try {
        let data=await pm.find({})
        res.json(data)
    } catch (error) {
        
    }
}

let updprod=async(req,res)=>{
    try {
        let data={...req.body}
        delete data["_id"]
        await pm.findByIdAndUpdate({"_id":req.body._id},data)
        res.json({"msg":"prod updated"})
    } catch (error) {
        
    }
}

let updpimg=async(req,res)=>{
    try
    {
    let data=await pm.findById({"_id":req.body._id})
    fs.rm(`./prodimgs/${data.pimg}`,()=>{})
    await pm.findByIdAndUpdate({"_id":req.body._id},{"pimg":req.file.filename})
    res.json({"msg":"prod img updated"})
    }
    catch(err)
    {
        console.log(err)
    }
  }

  let upddct=async(req,res)=>{
    try {
        await pm.findByIdAndUpdate({"_id":req.body._id},{"dct":req.body.dct})
        res.json({"msg":"dct is updated"})
    } catch (error) {
        
    }
  }

  let deldct=async(req,res)=>{
    try {
        await pm.findByIdAndUpdate({"_id":req.body._id},{$unset:{"dct":""}})
        res.json({"msg":"dct deleted"})
    } catch (error) {
        
    }
  }

  let delprod=async(req,res)=>{
    try {
      await pm.findByIdAndDelete({"_id":req.params._id})
      fs.rm(`./prodimgs/${req.params.pimg}`,()=>{})
      console.log(req.params._id)
      res.json({"msg":"prod deleted"})
    } catch (error) {
      console.log(error)
    }
  }

  let addrv=async(req,res)=>{
    try{
      await pm.findByIdAndUpdate({"_id":req.body.pid},{$push:{"reviews":req.body}})
let data=await pm.findById({"_id":req.body.pid})
      res.json(data)
    }
    catch(err)
    {

    }

  }

  let search=async(req,res)=>{
    try {
      let data=await pm.find({"name": { $regex: req.params.txt, $options: 'i' }}, {})
      res.json(data)
    } catch (error) {
      
    }
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "sadagangavaralakshmi@gmail.com",
      pass: "fwucjnmfecehjspj",
    },
  });

  let buy=async(req,res)=>{
    try {
      const info = await transporter.sendMail({
        from: '"ShopSMART" <sadagangavaralakshmi@gmail.com>', // sender address
        
        to: req.params.mail, // list of receivers
        subject: "Order Confirmation mail", // Subject line
        // text: "Hello world?", // plain text body
        html: "<b>Hello Mam/Sir</b><br><p>Thank you for ordering product form ShopSMART, Your order is confirmed and delivered within time</p><br><br><br><h4>THANKS FOR CHOOSING <span style={{color:red}}>ShopSMART<span></h4>",
        
      });
      res.json({"msg":"order placed"})
    } catch (error) {
      console.log(error)
    }
  }
module.exports={upload,addprod,getprod,updprod,updpimg,deldct,upddct,delprod,addrv,search,buy}