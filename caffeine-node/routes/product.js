const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get("/products", (req, res) => {
    Product.find().sort({updatedAt: -1}).exec()
      .then((products) => {
        res.json({ msg: products });
      })
      .catch((err) => res.json({ msg: err }));
  });



router.post("/new-product", (req, res) => {
    console.log(req.body);
    const { title ,description , img ,price ,state , qty} = req.body;

    Product.create({ title :title , description:description , img:img ,price: price , state: state, qty:qty}, (err, newP) => {
        console.log("new Product: ", newP);
        res.json({msg: "add product", newP})
       
    });
});


router.get("/products/:id", (res,req)=>{
  let id = req.params.id
  console.log(id)
  Product.findById(id)
  .then(product=>{
    console.log(product)
    res.json({msg:product})
  })
})



module.exports = router