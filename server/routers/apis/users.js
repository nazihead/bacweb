const express = require('express')
const router =express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/key')
const User= require('../../models/user.js')
const { json } = require('body-parser')

//获取用户信息
router.get('/userInfo',(req,res)=>{
    User.findById(req.headers.parma_id)
        .then(user=>{
            res.json(user)
        })
        .catch(err=>{
            res.status(400).json({msg:'出错了',err})
        })
   
})
//注册
router.post("/register",(req,res)=>{
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
            return res.status(400).json({
                msg:'邮箱已经被注册'
            })
        }else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                identity:req.body.identity, //身份
                // headUrl:req.body.headUrl,

            })
            //加密
            bcrypt.hash(newUser.password,10,(err,hash)=>{
                if(err) throw err
                newUser.password=hash
                newUser.save() // 存到数据库
                    .then(user=>{
                        res.json(user)
                    })
                    .catch(err=>{
                        console.log("存数据失败",err)
                    })
            })
        }
    })
})
//登录
router.post("/login",(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(!user){
            return res.status(400).json({
                msg:'该用户不存在'
            })
        }else{
            // //解密
            bcrypt.compare(password,user.password)
            .then(ismatch =>{
                if(ismatch){
                    //传回token
                    const rule = {id:user._id,email:user.email,identity:user.identity}
                    // jwt.sign('规则','名称','过期时间','箭头函数')
                    jwt.sign(rule,keys.secretKey,{expiresIn:3600},(err,tonken)=>{
                        res.json({
                            token:tonken
                        })
                    })
                }else{
                    res.status(400).json({
                    msg:'密码错误'
                })
                }
            })
        }
    })
})
module.exports = router