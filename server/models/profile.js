const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    type:{
        type:String,
        require:true
    },
    describe:{
        type:String,
    },
    income:{
        type:String,
        require:true
    },
    expend:{
        type:String,
        require:true
    },
    cash:{
        type:String,
        require:true
    },
    date:{
        type:String,
        default:Date.now
    },
    remark:{                        //备注
        type:String,
    },
})
module.exports = Profile = mongoose.model("profile",ProfileSchema)