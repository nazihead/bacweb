const express = require('express')
const router =express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../config/key')
const User= require('../../models/user.js')
const Profile= require('../../models/profile')
const moment = require('moment')

//获取用户资金信息
router.get('/',(req,res)=>{
    const {pageNo,pageSize} = req.query
    if(!pageNo){
        res.status(400).json({
            msg:'请传入pageNo'
        })
    }
    if(!pageSize){
        res.status(400).json({
            msg:'请传入pageSize'
        })
    }
    Profile.countDocuments()
    .then(count=>{
        let skip = (pageNo-1)*pageSize
        let limit = pageSize*1
        if(Object.is(skip,NaN) || Object.is(limit,NaN)){
            res.status(400).json({
                msg:'出错了'
            })
            return
        }
        Profile.find().skip(skip).limit(limit) .sort({ 'created': -1 })
        .then(profile=>{
            res.json({profile,total:count,pageNo,pageSize})
        })
        .catch(err=>{
            res.status(400).json({
                err:err,
                msg:'出错了'
            })
        })
    }).catch(err=>{
        res.status(400).json({
            err:err,
            msg:'出错了'
        })
    })
    
})
//获取单条资金信息
router.get('/:id',(req,res)=>{
     // console.log('req.query',req.query)
    console.log('req.params',req.params.id)
    Profile.findOne({_id:req.params.id})
    .then(data=>{
        console.log('data',data)
        res.json({
            data
        });
    }).catch(err=>{
        console.log('err',err)
        res.status(400).json({
            err
        })
    })
})
//编辑单条资金信息
router.post('/editprofile/',(req,res)=>{

    const reqdata = ({
        type:req.body.type,
        describe:req.body.describe,
        income:req.body.income,
        expend:req.body.expend, 
        cash:req.body.cash,
        remark:req.body.remark,
        date:Date.now()
        
    })
    // console.log('req.query',req.query)
    // console.log('req.params',req.params)
    Profile.findOne({_id:req.query.id})
    .then(profile=>{
        const tempData=Object.assign({},profile.toObject(),reqdata)
        console.log('服务器的数据',profile)
        console.log('传上来的数据',reqdata)
        console.log('tempData',tempData)
        Profile.findOneAndUpdate(
            {_id:req.query.id},
            {$set:tempData},
            {new:true}
            ) // 存到数据库
            .then(dataa=>{
                console.log('获得的数据',dataa)
                res.json(dataa)
            })
            .catch(err=>{
                res.status(400).json({
                    err
                })
            })
    }).catch(err=>{
        res.status(400).json({
            err
        })
    })
    
})
//删除单条资金信息
router.delete('/deleteprofile/:id',(req,res)=>{
    
    // console.log('req.query.id',req.query.id)
    // console.log('req.query',req.query)
    // console.log('req.params.id',req.params.id)
    // console.log('req.params',req.params)
    Profile.deleteOne({_id:req.params.id})
    .then(data=>{
        console.log(666,data)
        if(data.deletedCount === 0){
            res.status(400).json({
                msg:'数据不存在'
            })
        }else if(data.deletedCount === 1){
            res.json({
                msg:'删除成功'
            })
        }else{
            res.status(400).json({
                msg:'删除失败'
            })
        }
            
    })
    .catch(err=>{
        console.log("err",err)
        res.status(400).json({
            err
        })
    })
})
router.post('/addprofile',(req,res)=>{
    if(!req.body.type  || !req.body.income || !req.body.expend || !req.body.cash){
        res.status(400).json({
            msg:'请求参数不完整'
        })
    }
    const newProfile = new Profile({
        type:req.body.type,
        describe:req.body.describe,
        income:req.body.income,
        expend:req.body.expend, 
        cash:req.body.cash,
        remark:req.body.remark,

    })
    newProfile.save() // 存到数据库
        .then(user=>{
            res.json(user)
        })
        .catch(err=>{
            console.log("存数据失败",err)
        })
})

module.exports = router