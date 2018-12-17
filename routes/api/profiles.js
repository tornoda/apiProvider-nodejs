const express = require('express')
const router = express.Router()
const Profile = require('../../modules/Profile')
const passport = require('passport')

// $route POST /api/profiles/add
// @desc 增加数据
// @access private
router.post(
    '/add',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { type, describe, income, expend, cash, remark } = req.body
        new Profile({ type, describe, income, expend, cash, remark }).save()
            .then(profile => {
                res.json(profile)
            })
            .catch(err => { throw err })
    }
)

// $route GET /api/profiles
// @desc 所有数据
// @access private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.find()
            .then(profiles => {
                if (!profiles) return res.status(404).json('没有信息')
                res.json(profiles)
            })
    }
)

// $route GET /api/profiles/:id
// @desc 根据指定id返回数据
// @access private
router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ _id: req.params.id })
            .then(profile => {
                if (!profile) return res.status(404).json('没有信息')
                res.json(profile)
            })
            .catch(err => {
                res.status(404).json('没有信息')
                throw err
            })
    }
)

// $route POST /api/profiles/edit/:id
// @desc 修改指定id数据
// @access private
router.post(
    '/edit/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.params
        Profile.findOneAndUpdate({ _id: id }, req.body)
            .then((profile) => {
                res.json(profile)
            })
            .catch((err) => { res.status(400).json('failed') })
    }
)

// $route POST /api/profiles/delete/:id
// @desc 删除指定id数据
// @access private
router.post(
    '/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { id } = req.params
        Profile.findOneAndDelete({ _id: id })
            .then(profile => res.json({msg: "删除成功"}))
            .catch(err => { throw err })
    }
)

module.exports = router