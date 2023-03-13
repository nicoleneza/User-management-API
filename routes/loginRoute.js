const loginRouter = require('express').Router()
 const user = require('../startup/models/user.model').default
const Joi = require('@hapi/joi')
const User = require('../startup/models/user.model')
const bcrypt = require('bcrypt')
const { Schema } = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

function loginUserValidation(user){
    const schema = Joi.object({
        username: Joi
                  .string()
                  .min(8)
                  .max(45)
                  .required(),
        password: Joi.string().min(8).max(45).required(),
        email: Joi
        .string()
        .min(8)
        .max(45)
        .required()
        .email()
    })
    return schema.validate(user)
}



loginRouter.post('/login',async (req,res)=>{
    const  {error} = loginUserValidation(req.body)
   // console.log(req.body)
if(error) return res.status(400).send(error.details[0].message)

const user = await User.findOne({username:req.body.username})
if(!user)  return res.status(400).send("Incorrect credentials")

const validPass = await bcrypt.compare(req.body.password,user.password)
 if(!validPass) return res.status(400).send("Invalid password")

 const token = jwt.sign({email:User.email},'12345')
//  res.header('auth-token',token).send(token)
 res.json(token)
// if(!email || !validPass) return res.status(400).send('Invalid credentials')

//create andassign token

 res.send("logged in!")
})


module.exports= loginRouter