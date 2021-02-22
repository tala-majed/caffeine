const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email : {
        type :String , 
        required :true ,
    },
    password : {
        type :String , 
        required :true
    } , 
    name : {
        type :String , 
        required :true
    },
    img : {
        type :String ,
        default: "http://romanroadtrust.co.uk/wp-content/uploads/2018/01/profile-icon-png-898-300x300.png"
        
       
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    products:[
    { oneProduct: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
        qty: String
        
    }
}
]

} , {timestamps :true})


const User = mongoose.model('user' , userSchema)
module.exports = User
