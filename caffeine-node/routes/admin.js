const express = require("express");
const router = express.Router();
const Article = require('../models/article')
const Product = require('../models/product')
const User = require('../models/user')


router.get("/admin", (req, res) => {
    Article.find()
        .then((articles) => {
            res.json({ msg: articles });
        })
        .catch((err) => res.json({ msg: err }));
});

router.get("/users", (re, res) => {
    User.find()
        .then((users) => {
            res.json({ msg: users })
        })

});

router.delete('/:productId', (req, res) => {

    let productId = req.params.productId

    Product.findByIdAndDelete(productId)
        .then(product => {
            res.json({ msg: "product deleted !", pruduct: product })
        })

})

router.delete('/:userId/deleteuser', (req, res) => {

    let userId = req.params.userId

    User.findByIdAndDelete(userId)
        .then(user => {
            res.json({ msg: "user deleted !", user: user })
        })

})

router.put('/:userId', (req, res)=>{
    let userId = req.params.userId
    const isAdmin = req.body.isAdmin
    console.log(isAdmin)
    User.findOne({_id: userId})
    .then(user=>{
        User.updateOne({_id: userId}, {isAdmin: !isAdmin}, (err, updateUser)=>{
            console.log("user isAdmin", updateUser)
            res.json({msg: "update user", updateUser})
        })
    })
})

module.exports = router;