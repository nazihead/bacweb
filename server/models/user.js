const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    headUrl:{
        type:String,
    },
    date:{
        type:String,
        default:Date.now
    },
    identity:{                        //身份  管理// 普通//nomal
        type:String,
        require:true
    },
})
module.exports = User = mongoose.model("user",userSchema)