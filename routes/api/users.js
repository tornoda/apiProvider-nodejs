//注册和登录
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../modules/User')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const secretKey = require('../../config/key').secretKey
const passport = require('passport')

// $route GET /api/users/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: 'router test ok'
    })
})

// $route POST /api/users/register
// @desc 返回请求的json数据
// @access public
router.post('/register', (req, res) => {
    console.log(req.body)
    const { name, email, password, identity } = req.body
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    //查询数据库中是否存在邮箱
    User.findOne({ email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ msg: '邮箱已经存在' })
            } else {
                bcrypt.hash(password, 10)
                    .then(function (hash) {
                        return Promise.resolve(hash)
                    })
                    .then((hash) => {
                        const newUser = new User({
                            name,
                            email,
                            avatar,
                            identity,
                            password: hash
                        })
                        newUser.save()
                            .then(user => {
                                const { name, email, avatar, identity, passport } = user
                                res.json({
                                    name, email, avatar, identity, passport,
                                    msg: '注册成功'
                                })
                            })
                            .catch(err => { throw err })
                    })
            }
        })
        .catch((err) => {
            throw err
        })
})

// $route POST /api/users/login
// @desc 返回请求的json数据
// @access public
router.post('/login', (req, res) => {
    const { password, email } = req.body
    //判断密码是否正确的函数
    async function checkUser(password, hash) {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch
    }
    //查询数据库，是否存在邮箱
    User.findOne({ email })
        .then((user) => {
            const { id, name, avatar, identity } = user
            if (!user) return res.status(404).json({ msg: '邮箱未注册' })
            checkUser(password, user.password)
                .then((isMatch) => {
                    //密码错误
                    if (!isMatch) return res.status(400).json({ msg: '密码错误' })
                    //密码正确，返回token
                    jwt.sign({ id, name, avatar, identity }, secretKey, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err
                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            msg: '登录成功'
                        })
                    })
                })
        })
})

// $route GET /api/users/current
// @desc 返回当前user
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id, name, email, identity } = req.user
    res.json({ id, name, email, identity })
})

module.exports = router