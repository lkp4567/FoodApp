const express = require('express')
const User = require('../models/User')

const router = express.Router()
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const jwtSecret = "HaHa"

router.post('/creatuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({  errors: errors.array() })
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password, salt);
    
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,  
            location: req.body.location
        })
       return res.json({ success:true})
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})



router.post('/loginuser',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    
], async(req ,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({  errors: errors.array() })
    }
    let email = req.body.email;
     try{
       let userData =  await User.findOne({email});
       if(!userData){
        return res.status(400).json({errors:"try logging with correct credentials"})
       }
       const pwdCompare = await bcrypt.compare(req.body.password, userData.password); // this return true false.
       if (!pwdCompare) {
           return res.status(400).json({  error: "Try Logging in with correct credential" });
       }
       const data = {
           user: {
               id: userData.id
           }
       }
      success = true;
       const authToken = jwt.sign(data, jwtSecret);
       return res.json({ success, authToken :authToken})


   }
     catch(error){
        console.log(error)
        res.json({success:false});
     }
})
    
   
    
    

module.exports = router;