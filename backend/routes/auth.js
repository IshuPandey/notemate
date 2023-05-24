const express = require("express");
const bcrypt=require('bcryptjs');

const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var fetchUser=require('../middleware/fetchUser')

const jwt_secret='secret';
// ROUTE 1: create a user using POST "/api/auth"

router.post(
  "/createuser",
  [
    body("email", "Enter valid email").isEmail(),
    body("name", "Minimum characters must be 3").isLength({ min: 3 }),
    body("password", "Password must be of length 8").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success=false;
    //If errors, return errors and bad request

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }


    //unique  email checking
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Email already exist" });
      }
      const salt=await bcrypt.genSalt(10);
     const secPass=await bcrypt.hash(req.body.password,salt);


      //Creating new user


      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
        user:{
          id:user.id
        }
      }
      const jwtData=jwt.sign(data,jwt_secret);
      console.log(jwtData);
      // res.json(user);
        success=true;
      res.json({success,jwtData})
    }
     catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE 2: Authentication of a user using: POST "/api/auth/login".


router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists()
  ],
  async (req, res) => {
    let success=false;

     //If errors, return errors and bad request

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const{email,password}=req.body;
     try {
        let user=await User.findOne({email});
        if(!user){
          success=false;
          return res.status(400).json({error:"Incorrect Email"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
          success=false;
          return res.status(400).json({success,error:"Incorrect password"});
        }
        const data={
          user:{
            id:user.id
          }
        }
        const jwtData=jwt.sign(data,jwt_secret);
        success=true;
        res.json({success,jwtData})
        
      
     } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
      
     }

  });


  //ROUTE 3: GET LOGGED IN USER DETAILS USING POST "/api/auth/getUser" Login required


  router.post(
    "/getuser", fetchUser,async (req, res) => {

  try {
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user);
  }
   catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});






module.exports = router;
