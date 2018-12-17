const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')

//引入user.js
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

//使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//数据库地址
const db = require('./config/key').mongoURI

// 链接数据库
mongoose.connect(db)
    .then(() => console.log('bd connected'))
    .catch((err) => console.log(err))

// //路由
// app.get('/', (req, res) => {
//     res.send('hello yes')
// })


//初始化passport,告诉vue使用password
app.use(passport.initialize())
//passport.use(...)，对pass进行设置
require('./config/passport')(passport)

//配置Access-Control-Allow-Origin
app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range,Authorization')
    next()
})

//使用router
app.use('/api/users', users)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})