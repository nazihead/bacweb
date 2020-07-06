const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000    

const db =require('./config/key.js')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const users = require('./routers/apis/users')
const profile = require('./routers/apis/profile')
const keys = require('./config/key')

mongoose.connect(db.mongoURL)
    .then(()=>{
        console.log('数据库连接成功')
    })
    .catch((err)=>{
         console.log('数据库连接失败',err)
    })
//mongod -dbpath G:\mongodatas\db

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    
    if (req.url != '/api/users/login' && req.url != '/api/users/register') {
        if(typeof req.headers['authorization'] !== 'undefined') {
            jwt.verify(req.headers['authorization'],keys.secretKey, (err, authData) => {
                if(err) {
                    res.send({status: 403, msg: '登录已过期,请重新登录'});
                  } else {
                    req.headers.parma_id=authData.id
                    //刷新token
                    
                    const decode = jwt.decode(req.headers['authorization']);
                    const rule = {id:decode.id,email:decode.email,identity:decode.identity}
                    jwt.sign(rule,keys.secretKey,{expiresIn:keys.expriTime},function(err,token){
                        if(err){
                            console.log('签名出错',err)
                            next ()
                        }
                        //将新token返回到res里
                        res.append("token",token)
                        next ()
                    })
                 }
            })
        } else {
            res.send({status: 403, msg: '未登陆，请先登陆'});
        }
    } else {
        next();
    }
})



app.get('/', (req, res) => res.send('Hello World!'))

//使用routers (中间件)
app.use('/api/users',users)
app.use('/api/profile',profile)

app.listen(port, () => console.log(`Example app listening on port port!`))