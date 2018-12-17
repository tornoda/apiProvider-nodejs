const mongoose = require('mongoose')
const Schema = mongoose.Schema

//创建Schema


// console.log(`${year}-${mouth}-${date}`)
// console.log(`${hours}:${minutes}`)

const ProfileSchema = new Schema({
    type: {
        type: String
    },
    describe: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
    },
    remark: {
        type: String,
    },
    data: {
        type: String,
        default: () => {
            const now = new Date()
            const year = now.getFullYear()
            const mouth = now.getMonth() + 1
            const date = now.getDate()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            return `${year}-${mouth}-${date} ${hours}:${minutes}`
        }
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)