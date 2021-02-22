const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require('../models/product')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ msg: users });
    })
    .catch((err) => res.json({ msg: err }));
});

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ msg: users });
    })
    .catch((err) => res.json({ msg: err }));
});

router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ msg: users });
    })
    .catch((err) => res.json({ msg: err }));
});


router.post("/register", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    
  };

  newUser.email = newUser.email.toLowerCase();
  User.findOne({ email: newUser.email })
    .then((user) => {
      // if the email exist
      if (user) {
        res.json({
          msg: "This email already exist !",
        });
      }
      // if the email doesn't exist
      else {
        var salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(req.body.password, salt);
        newUser.email = newUser.email.toLowerCase();
        User.create(newUser).then((user) => {
          res.json({ msg: "User has been registerd", user: user });
        });
      }
    })
    .catch((err) => res.json({ msg: err }));
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
 
  email = email.toLowerCase();
  const user = await User.findOne({ email: email }); // its same to =>  User.findOne({email:email}).then(user => { })

  // if the email doesn't exist
  if (!user) {
    res.json({ msg: "This email does not exist" });
  }
  //  if the email exist
  else {
    // if password is correct
    if (bcrypt.compareSync(password, user.password)) {
      user.password = undefined;
      let payload = { user };
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn:   60 * 60 * 60 * 1000 * 60 * 60,
      }); // to the user info
      res.json({ msg: "User login ", token });
    }
    // if password is not correct
    else {
      res.json({ msg: "Password is not correct" });
    }
  }
});

router.get("/:token", (req, res) => {
  let token = req.params.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) return res.json({ msg: err });

    let user = decode;

    res.json({ msg: "User decoded", user });
  });
}); 

router.post('/forgot' , (req,res)=>{


  User.findOne({email: req.body.email}, function (err, foundUser) {
    
    password = req.body.password;
    console.log(foundUser);
    bcrypt.genSalt((err, salt) => {
      // changes every time
      console.log("bcrypt salt:", salt);
      bcrypt.hash(password, salt, (err, passwordHash) => {
          console.log("password:", password);
          console.log("passwordHash:", passwordHash);
          User.updateOne({ email :req.body.email },{password: passwordHash }, (err, newUser) => {
            
             
          });
      });
  });
    if (!foundUser) {
      console.log('No user with email ' + email);
    
  
    }  

  })

})


router.put("/:userId/:productId", (req, res) => {
  const productId = req.params.productId
  const userId = req.params.userId
  const productQty = req.body.qty
 
  Product.findOne({_id: productId}, (err, product)=>{
    let addProduct = product
    addProduct.qty = productQty
    const updateUser = {
      $push: {
        products: { oneProduct: {
          id: product,
          qty: productQty
          
    }
  }
    }
  }
  console.log()
  User.findByIdAndUpdate(userId, updateUser, (err, newUser) => {
    

    res.json({ msg: "Product Added!"});

  })
    
  })

 
});




router.get('/:userId/cart' , (req,res)=>{
  const userId = req.params.userId
  
  User.findOne({_id: userId}).populate('products.oneProduct.id')
    .then(user=>{
      
     res.json({ msg: "User Info", user});

    })

  })


router.delete('/:userId/cart/:productId' , (req,res)=>{
  const userId = req.params.userId
  const productId = req.params.productId
  User.findOne({_id: userId})
  .then(user => {
    console.log(user)
      let userProducts = user.products.filter(product =>{
        return !(product.oneProduct.id == productId)
      })
      console.log(user.products.length)
      User.findByIdAndUpdate(userId ,{products :userProducts})
      .then(user =>{
          res.json({msg : "Product Has Been Deleted!"})
      })
  })

})

router.delete('/cart/delete-order/:userId' , (req,res)=>{
  const userId = req.params.userId
  
  User.findOneAndUpdate({_id: userId},{$set: { products: [] }})
  .then(user =>{
    
          res.json({msg : "Your Orders Has Been Deleted!"})

  })


})


router.put('/profile/info/:userId', (req, res) => {
  const newImg = req.body.img;
  const userId = req.params.userId

    User.updateOne({ _id :userId },{ img: ` ${newImg}`}, (err, newUser) => {

});
    
  })





module.exports = router;