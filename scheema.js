const mongoose = require('mongoose');

const scema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    regNum: {
        type:String,
        required:true
    },
    dob: {
        type:String,
        required:true
    },
    promotion: {
        type:String,
        required:true
    },
    year : {
        type:String,
        required:true
    },
    dep : {
        type:String,
        required:true
    },
    college : {
        type:String,
        required:true
    },
    attendance: {
        type:String
    },
    pdf:{
        type:Buffer
    },
    mime:{
        type:String
    },
    files:[{
        file:{
            type:String
        },
        staffstate:{
            type:String
        },
        hodstate:{
            type:String
        }
    }],
    anno:[{
        heading:{
            type:String
        },
        image:{
            type:String
        },
        subheading:{
            type:String
        },
        imageid:{
            type:String
        },
        id:{
            type:String
        },
        content:{
            type:String
        }

    }],
    subject:
    [{
        subname:{
            type:String
        },
        subcode:{
            type:String
        },
        id:{
            type:String
        }

    }],
    timing:
    [{
        time1:{
            type:String
        },time2:{
            type:String
        },time3:{
            type:String
        },time4:{
            type:String
        },time4:{
            type:String
        },time5:{
            type:String
        },time6:{
            type:String
        },time7:{
            type:String
        },time8:{
            type:String
        },
        time9:{
            type:String
        },time10:{
            type:String
        },
        id:{
            type:String
        }
    }],
     day:
    [{
        
        day1:{
            type:String
        },
        p1:{
            type:String
        },
        p2:{
            type:String
        },
        p3:{
            type:String
        },
        p4:{
            type:String
        },
        p5:{
            type:String
        },
        p5:{
            type:String
        },
        p6:{
            type:String
        },
        p7:{
            type:String
        },
        p8:{
            type:String
        },
        p9:{
            type:String
        },
        p10:{
            type:String
        },
        p11:{
            type:String
        },
        p12:{
            type:String
        },
        id:{
            type:String
        }
    }],
    
    leave:
    [{
        staffstage:{
            type:String
        },
        hodstage:{
            type:String
        },
        pdf:{
            type:String
        },
        mime:{
            type:String
        },
        
        id:{
            type:String
        }
    }],
    feesStaff:
    [{
        feesName:{
            type:String,
            required:true
        },
        id:{
            type:String
        }
    }],
    staffattendance:
    [{
        date:{
            type:String,
            required:true
        },
        id:{
            type:String
        }
    }],
    stuattendance:
    [{
        attendance:{
            type:String,
            required:true
        },
        id:{
            type:String
        }
    }],
    feesStu:
    [{
        feesName:{
            type:String,
            required:true
        },
        total:{
            type:Number
        },
        paid:{
            type:Number
        },
        balance:{
            type:Number
        },
        id:{
            type:String
        }
    }],
    examlist:
    [{
        examName:{
            type:String
        },
        id:{
            type:String
        },
        exams:[{
            subname:{
                type:String
            },
            subcode:{
                type:String
            },
            date:{
                type:String
            },
            time:{
                type:String
            },
            id:{
                type:String
            }
        }]
    }],
    mark:
[{
        
        testName:{
            type:String
        },
        id:{
            type:String
        },
         marks:
        [{
            
            marka:{
                type:Number
            },
            subcode:{
                type:String
            },
            id:{
                type:String
            }
        }]
    }
] 
});

module.exports = mongoose.model('register',scema);
