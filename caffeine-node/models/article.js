const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    title : {
        type :String , 
        required :true ,
        default: ''
    },
    content : {
        type :String , 
        required :true,
        default: ''
    } , 
    img : {
        type :String , 
        default: 'https://www.visitdubai.com/sc7/-/media/images/articles/cafe-society-specialty-coffee/updated-03-2019/in-article-desktop-slider-the-sum-of-us.jpg'
    },

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    views: {
        type: String,
        default: '0'
    }

} , {timestamps :true})


const Article = mongoose.model('article' , articleSchema)
module.exports = Article