const registerRouter = require('express').Router()
 const user = require('../startup/models/user.model').default
const Joi = require('@hapi/joi')
const User = require('../startup/models/user.model')
const bcrypt = require('bcrypt')
const _= require('lodash')
const { Schema } = require('mongoose')
// const jwt = require('jsonwebtoken')
// const _= require('lodash')

function validateUser(user){
    const schema = Joi.object({
        firstname: Joi
                     .string()
                     .min(8)
                     .max(45)
                     .required(),
          lastname: Joi
                      .string()
                      .min(8)
                      .max(45)
                      .required(),
          username: Joi
                  .string()
                  .min(8)
                  .max(45)
                  .required(),
          email: Joi
                   .string()
                   .min(8)
                   .max(45)
                   .required()
                   .email(),
          password: Joi.string().min(8).max(45).required()
      })
      return schema.validate(user)
}




registerRouter.post('/register',async (req,res)=>{

const  {error} = validateUser(req.body)
if(error) return res.status(400).send(error.details[0].message)

const emailExist = await User.findOne({email:req.body.email})
if(emailExist)  return res.status(400).send("Email already exists")

//hash the passwords

const newUser = new User(_.pick(req.body, ["firstname", "lastname", "username", "email","password"]))
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt)
newUser.password = hashedPassword
await newUser.save()
return res
    .send(_.pick(newUser, ["firstname", "lastname", "username", "email","password"]))
    .status(201);
});

// ({
//           firstname: req.body.firstname,
//           lastname: req.body.lastname,
//           username:req.body.username,
//           email:req.body.email,
//           password:hashedPassword 
//       });

//   try{
//          const savedUser = await newUser.save();
//    res.send(savedUser)
//   } catch (err){
//       res.status(400).send(err)
//   }
// });





module.exports = registerRouter