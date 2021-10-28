const express = require ('express');
const app = express();
const multer=require('multer')
const router = require('../backend/router');
const cors = require('cors');
const mongoose = require("mongoose");
const register = require("../backend/scheema");
const path=require('path');
app.use(express.json());
app.use(cors());
require('dotenv').config();
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'sakthivel321', 
    api_key: '774684428754666', 
    api_secret: 'U8lrmQuj1p1oMXeICba0xo7Bj5I',
    secure: false
  });

mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true  }, (err) => {
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Database Connection Successfully");
    }
});

app.get('/',(req,res)=>{
    res.status(200).send("Sakthivel");
})
app.use('/user',router);
app.listen(process.env.PORT || 3000, (err) => {

    if(err)
    {
        console.log("Server not Run"+ err);
    }
    if(!err)
    {
        console.log("Server Run on Port 3000");
    }
})
//Set Storage Engine
const storage = multer.diskStorage({
    destination: './sakthivel',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
 });
 
 const upload = multer({
    storage: storage
 })

 app.post('/post', upload.single('pdf') ,async (req,res)=>{
     const file=req.file;
     console.log(file);
     cloudinary.uploader.upload(file.path, function(error, result) {console.log(result, error)});
 })
//annonce

app.put('/anno/:id/:heading/:subheading/:content',upload.single('pdf'),async(req,res)=>
{
    const file=req.file;
    console.log(file);
    cloudinary.uploader.upload(file.path,async (error, result)=> {console.log(result, error);
        const files= await register.updateOne({_id:req.params.id},{$push:{
            anno:{
                'heading':req.params.heading,
                'subheading':req.params.subheading,
                'image':result.url,
                'imageid':result.public_id,
                'content':req.params.content,
                'id':mongoose.Types.ObjectId()
                }
               }
            }
               );
               res.json(files);
    });
 
  
})
//annonce del


app.put('/annodel/:_id',async(req,res)=>
{

    cloudinary.uploader.destroy(req.body.imageid, function(error,result) {
        console.log(result, error) });

   const files= await register.updateOne({_id:req.params._id},{$pull: {anno:{id:req.body.id}}});
   res.json(files);
   console.log(req.params.id);
   console.log(req.body.id);
})

//annonce edi
app.put('/annoedi/:id/:heading/:subheading/:content/:imageid/:annoid',upload.single('pdf'),async(req,res)=>
{
    const file=req.file;
    console.log(file);
    console.log(req.params.imageid);
    cloudinary.uploader.destroy(req.params.imageid, function(error,result) {
        console.log(result, error) });
    cloudinary.uploader.upload(file.path,async (error, result)=> {console.log(result, error);
      
    const files= await register.updateOne({_id:req.params.id,"anno.id":req.params.annoid},
      {
         '$set':{
            'anno.$.heading':req.params.heading,
            'anno.$.subheading':req.params.subheading,
            'anno.$.image':result.url,
            'anno.$.imageid':result.public_id,
            'anno.$.content':req.params.content}})
   res.json(files);
})
});