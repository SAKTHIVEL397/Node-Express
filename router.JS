const express = require("express");
const router = express.Router();
const register = require("../backend/scheema");
const mongoose = require('mongoose');
const fs=require('fs');
const multer = require('multer');
const path =require('path');
const { find } = require("../backend/scheema");

//Set Storage Engine
const storage = multer.diskStorage({
   destination: './sakthivel',
   filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now() + 
   path.extname(file.originalname));
   console.log(req.file);
   }
});

const upload = multer({
   storage: storage
})


//Change Featured Image - POST
router.post('/saveImage',upload.single('image'),async (req, res) => {
  await console.log(req.file.buffer);
   res.send("soli mudinju");

  //removed the rest of the code to keep it simple. req.file here is always undefined.

});
//register princ

router.post('/registerprinc',async (req,res) => {
   var registernumberexist =await register.findOne({regNum:req.body.regNum});
   const result = await register.findOne({promotion :{$in : "principal"},college :{$in : req.body.college}});
   if(registernumberexist)
   {
       res.json("Phone Numbrer already exist")
   }
   else
   {
   if(result)
   {
       res.json("College Name  Already exist")
   }
   else
   {
     const registers = await new register({
        name : req.body.name,
        regNum : req.body.regNum,
        dob:req.body.dob,
        promotion:req.body.promotion,
        year:req.body.year,
        dep:req.body.dep,
        college:req.body.college
 })
    const save =await registers.save();
    res.json(save);
 }
}
})




//register hod

router.post('/registerhod',async (req,res) => {
   var registernumberexist =await register.findOne({regNum:req.body.regNum});
   const result = await register.findOne({dep :{$in : req.body.dep},promotion :{$in : "hod"},college :{$in : req.body.college}});
   if(registernumberexist)
   {
       res.json("Register Numbrer already exist")
   }
   else
   {
   if(result)
   {
       res.json("Department Of Hod Is Already Create")
   }
   else
   {
     const registers = await new register({
        name : req.body.name,
        regNum : req.body.regNum,
        dob:req.body.dob,
        promotion:req.body.promotion,
        year:req.body.year,
        dep:req.body.dep,
        college:req.body.college
 })
    const save =await registers.save();
    res.json(save);
 }
}
})

//register staff

router.post('/registerstaff',async (req,res) => {
    var registernumberexist =await register.findOne({regNum:req.body.regNum});
    const result = await register.findOne({dep :{$in : req.body.dep},promotion :{$in : "staff"},year :{$in :req.body.year },college :{$in : req.body.college}});
    if(registernumberexist)
    {
        res.json("Register Numbrer already exist")
    }
    else
    {
    if(result)
    {
        res.json("year Of Class Advisor Is Already Create")
    }
    else
    {
      const registers = await new register({
         name : req.body.name,
         regNum : req.body.regNum,
         dob:req.body.dob,
         promotion:req.body.promotion,
         year:req.body.year,
         dep:req.body.dep,
         college:req.body.college
  })
     const save =await registers.save();
     res.json(save);
  }
 }
})

//register 

router.post('/register',async (req,res) => {
   var registernumberexist =await register.findOne({regNum:req.body.regNum});


   if(registernumberexist)
   {
       res.json("Register Numbrer already exist")
   }
   else
   {
   const registers = await new register({
       name : req.body.name,
       regNum : req.body.regNum,
       dob:req.body.dob,
       promotion:req.body.promotion,
       year:req.body.year,
       dep:req.body.dep,
       college:req.body.college
})
   const save =await registers.save();
   res.json(save);
}
})

//login

router.post('/login', async (req,res) => {
    var registernumberexist =await register.findOne({regNum:req.body.regNum});

    if(!registernumberexist)
    {
        res.json("Register Number Not Valid");
    }
    if(req.body.dob===registernumberexist.dob)
    {
        res.json(registernumberexist);
    }
    res.json("Password not valid");
})

//getall

router.get('/get',async (req,res) => {
    var getall =await register.find();  
      res.json(getall);
    res.send(getall);
})

//edit

router.put('/:id',async(req,res) =>{
    
    var registernumberexist =await register.findOne({regNum:req.body.regNum});
    if(registernumberexist)
    {
        res.json("Register Number Already Exist")
    }
    const putone = await register.updateOne({_id:req.params.id},{$set:{name:req.body.name,regNum:req.body.regNum,dob:req.body.dob,year:req.body.year,dep:req.body.dep}})
    res.json(putone);
});

//findbyid

router.get('/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    res.json(findbyid);
});

//delete

router.delete('/:id',async(req,res) =>{
    const deletebyId=await register.remove({_id:req.params.id});
    res.json(deletebyId);
});

//student

router.get('/hod/student/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    const result = await register.find({dep :{$in : findbyid.dep},promotion :{$in : "student"},college :{$in : findbyid.college}});
    res.send(result);
});

//staff

router.get('/hod/staff/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    const result = await register.find({dep :{$in : findbyid.dep},promotion :{$in : "staff"},college :{$in : findbyid.college}});
    res.send(result);
});

//hod

router.get('/princ/hod/:id',async(req,res) =>{
   const findbyid=await register.findById(req.params.id);
   const result = await register.find({promotion :{$in : "hod"},college :{$in : findbyid.college}});
   res.send(result);
});

//find me

router.get('/findme/:id',async(req,res) =>{
   const findbyid=await register.findOne({regNum :{$in : req.params.id}});
  if(!findbyid)
  {
      res.json("Mobile Number Not Valid");
  }
  else
  {
     if(findbyid.promotion==="principal")
     {
        res.json("forget");
     }
     else
     {
        res.json("not a mobile number");
     }
  }
});

//staff-student

router.get('/hod/staff/student/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    const result = await register.find({dep :{$in : findbyid.dep},promotion :{$in : "student"},year :{$in : findbyid.year},college :{$in : findbyid.college}});
    res.json(result);
});

//internalsubjects

router.put('/internal/:id',async(req,res) =>{
    const putone = await register.updateOne({_id:req.params.id},{$set:{'subject.sc1':req.body.sc1,'subject.sc2':req.body.sc2,'subject.sc3':req.body.sc3,'subject.sc4':req.body.sc4,'subject.sc5':req.body.sc5,'subject.sc6':req.body.sc6,'subject.sc7':req.body.sc7,'subject.sc8':req.body.sc8,'subject.sc9':req.body.sc9,'subject.sn1':req.body.sn1,'subject.sn2':req.body.sn2,'subject.sn3':req.body.sn3,'subject.sn4':req.body.sn4,'subject.sn5':req.body.sn5,'subject.sn6':req.body.sn6,'subject.sn7':req.body.sn7,'subject.sn8':req.body.sn8,'subject.sn9':req.body.sn9}})
    res.json(putone);
});

router.put('/fileupload/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$set:{'files.file':req.body.file}});
   res.json(files);
})


//annonce

router.put('/anno/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
anno:{
    'heading':req.body.heading,
    'subheading':req.body.subheading,
    'image':req.body.image,
    'content':req.body.content,
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})





//leave del


router.put('/leavedel/:_id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id},{$pull: {leave:{id:req.body.id}}});
   res.json(files);
   console.log(req.params.id);
   console.log(req.body.id);
})






router.get('/hod/hod/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    const result = await register.findOne({dep :{$in : findbyid.dep},promotion :{$in : "hod"},college :{$in : findbyid.college}});
    res.json(result);
});

//subject

router.put('/subject/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
    subject:{
    'subcode':req.body.subcode,
    'subname':req.body.subname,
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})

//subject edi
router.put('/subjectedi/:id/:ida',async(req,res)=>
{
   console.log(req.params.id,req.params.ida);
   const files= await register.updateOne({_id:req.params.id,"subject.id":req.params.ida},
      {
         '$set':{
            'subject.$.subcode':req.body.subcode,
            'subject.$.subname':req.body.subname
             }})
   res.json(files);
})


router.get('/hod/hod/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    const result = await register.findOne({dep :{$in : findbyid.dep},promotion :{$in : "hod"},college :{$in : findbyid.college}});
    res.json(result);
});
//subject del


router.put('/subjectdel/:_id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id},{$pull: {subject:{id:req.body.id}}});
   res.json(files);
   console.log(req.body.id);
   console.log(req.params._id);
})

//add timetable

router.put('/timetabletiming/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
    timing:{
    'time1':req.body.time1,
    'time2':req.body.time2,
     'time3':req.body.time3,
    'time4':req.body.time4, 
    'time5':req.body.time5,
    'time6':req.body.time6,
     'time7':req.body.time7,
    'time8':req.body.time8, 
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})


//add timetable

router.put('/timetablep/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
    day:{
    'day1':req.body.day1,
    'p1':req.body.p1,
     'p2':req.body.p2,
    'p3':req.body.p3, 
    'p4':req.body.p4,
    'p5':req.body.p5,
     'p6':req.body.p6,
    'p7':req.body.p7, 
    'p8':req.body.p8, 
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})

//timetabletimingedi edi
router.put('/timetabletimingedi/:id/:ida',async(req,res)=>
{
   console.log(req.params.id,req.params.ida);
   const files= await register.updateOne({_id:req.params.id,"timing.id":req.params.ida},
      {
         '$set':{
            'timing.$.time1':req.body.time1,
    'timing.$.time2':req.body.time2,
     'timing.$.time3':req.body.time3,
    'timing.$.time4':req.body.time4, 
    'timing.$.time5':req.body.time5,
    'timing.$.time6':req.body.time6,
     'timing.$.time7':req.body.time7,
    'timing.$.time8':req.body.time8 }})
   res.json(files);
})

//period edi
router.put('/timetabledayedi/:id/:ida',async(req,res)=>
{
   console.log(req.params.id,req.params.ida);
   const files= await register.updateOne({_id:req.params.id,"day.id":req.params.ida},
      {
         '$set':{
            'day.$.p1':req.body.p1,
             'day.$.p2':req.body.p2,
            'day.$.p3':req.body.p3, 
            'day.$.p4':req.body.p4,
            'day.$.p5':req.body.p5,
             'day.$.p6':req.body.p6,
            'day.$.p7':req.body.p7, 
            'day.$.p8':req.body.p8 }})
   res.json(files);
})


router.get('/hod/hod/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    const result = await register.findOne({dep :{$in : findbyid.dep},promotion :{$in : "hod"},college :{$in : findbyid.college}});
    res.json(result);
});

//timetable del


router.put('/timetabledel/:_id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id},{$pull: {day:{id:req.body.id}}});
   res.json(files);
   console.log(req.body.id);
   console.log(req.params._id);
})
//timetableday del


router.put('/timetabledaydel/:_id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id},{$pull: {timing:{id:req.body.id}}});
   res.json(files);
   console.log(req.body.id);
   console.log(req.params._id);
})



//find classadvisor

router.get('/classadvisor/:id',async(req,res) =>{
    const findbyid=await register.findById(req.params.id);
    const result = await register.findOne({dep :{$in : findbyid.dep},promotion :{$in : "staff"},year :{$in :findbyid.year },college :{$in : findbyid.college}});
    res.send(result);
});



//add exam

router.put('/exam/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
    examlist:{
    'examName':req.body.examName,
    'id':mongoose.Types.ObjectId()
    }
   }
});
   res.json(files);
})


//exam del
router.put('/examdel/:_id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id},{$pull: {examlist:{id:req.body.id}}});
   res.json(files);
   console.log(req.body.id);
   console.log(req.params._id);
})

//exam edi
router.put('/examedi/:id/:ida',async(req,res)=>
{
   console.log(req.params.id,req.params.ida);
   const files= await register.updateOne({_id:req.params.id,"examlist.id":req.params.ida},
      {
         '$set':{
            'examlist.$.examName':req.body.examName
          }})
   res.json(files);
})

//add exams

router.put('/examexams/:id/:ida',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id,"examlist.id":req.params.ida},
   {
      $push:
      {
     'examlist.$.exams':{
        'subname':req.body.subname,
        'subcode':req.body.subcode,
        'time':req.body.time,
        'date':req.body.date,
        'id':mongoose.Types.ObjectId()
        }
    }

});
console.log(req.params.ida);
   res.json(files);

})

//exams del

router.put('/examexamsdel/:id/:ida',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id,"examlist.id":req.params.ida},
   {
      $pull:
      {
     'examlist.$.exams':{
        'id':req.body.id
        }
    }

});
console.log(req.params.id,req.params.ida,req.body.id);
   res.json(files);

})


//exams edi
router.put('/examexamsedi/:id/:ida/:idb',async(req,res)=>
{
   console.log(req.params.id,req.params.ida,req.params.idb);
   const files= await register.updateOne({_id:req.params.id,"examlist.id":req.params.ida,"exams.id":req.params.idb},
      {
         '$set':{
            'examlist.$.exams.$.date':req.body.date,
            'examlist.$.exams.$.subcode':req.body.subcode,
            'examlist.$.exams.$.subname':req.body.subname, 
            'examlist.$.exams.$.time':req.body.time}})
   res.json(files);
})


//addMark

router.put('/mark/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
    mark:{
      'testName':req.body.testName,
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})

//mark del


router.put('/markdel/:_id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id},
   {
      $pull:{mark:{id:req.body.id}}
});
res.json(files);
})

//marks del


router.put('/marksdel/:_id/:ida',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id,"mark.id":req.params.ida},
   {
      '$pull':
      {
 'mark.$.marks':{
   'id':req.body.id,
   
 }
}
});
res.json(files);
})

//addMarks

router.put('/marks/:id/:ida',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id,"mark.id":req.params.ida},
      {
         '$push':
         {
    'mark.$.marks':{
      'marka':req.body.marka,
      'subcode':req.body.subcode,
    'id':mongoose.Types.ObjectId()
    }
   }
});
   res.json(files);
})


//addfeesStaff

router.put('/feesstaff/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
    feesStaff:{
      'feesName':req.body.feesName,
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})

//addfeesStu

router.put('/feesstu/:id/:ida',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{$push:{
    feesStu:{
      'feesName':req.params.ida,
      'total':req.body.total,
      'balance':req.body.total,
      'paid': 0,
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})

//feesStu del


router.put('/feesstudel/:_id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params._id},{$pull: {feesStu:{id:req.body.id}}});
   res.json(files);
   console.log(req.body.id);
   console.log(req.params._id);
})
//feesstu edi
router.put('/feesstuedi/:id/:ida/:idb',async(req,res)=>
{
   const result=req.body.total-req.body.paid;
   console.log(req.params.id,req.params.ida);
   const files= await register.updateOne({_id:req.params.id,"feesStu.id":req.params.ida},
      {
         '$set':{
            'feesStu.$.feesName':req.params.idb,
            'feesStu.$.total':req.body.total,
            'feesStu.$.paid':req.body.paid,
            'feesStu.$.balance': result

             }})
   res.json(files);
})

//attendance date

router.put('/attendance/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{
      $push:{
staffattendance:{
    'date':req.body.date,
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})
//attendance date edit

router.put('/attendanceedi/:id/:ida',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id,"staffattendance.id":req.params.ida},
   {
      '$set':{
         'staffattendance.$.date':req.body.date

}}
   );
   res.json(files);
})
//attendance stu

router.put('/attendancestu/:id',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id},{
      $push:{
stuattendance:{
    'attendance':req.body.attendance,
    'id':mongoose.Types.ObjectId()
    }
   }
}
   );
   res.json(files);
})

//attendance attendance edit

router.put('/attendancestuedi/:id/:ida',async(req,res)=>
{
   const files= await register.updateOne({_id:req.params.id,"stuattendance.id":req.params.ida},
   {
      '$set':{
         'stuattendance.$.attendance':req.body.attendance

}}
   );
   res.json(files);
})
module.exports = router;