const updateRouter = require('express').Router()
 const user = require('../startup/models/user.model').default
// const Joi = require('@hapi/joi')
const User = require('../startup/models/user.model')
// const bcrypt = require('bcrypt')
const { Schema } = require('mongoose')
//  const dotenv = require('dotenv')
// dotenv.config()

function updateIntoMongoDB(req, res){
    user.findOneAndUpdate({email:req.body.email},
         req.body, { new: true })
        .then(user => res.send(user))
        .catch(err => res.send(err).status(400));
    };

    updateRouter.put('/update',(req,res)=>{
         updateIntoMongoDB((req,res)=>{
          res.send()
         })
    })
// get one user
    updateRouter.get("/:email", async (req, res) => {
        const users = await User.find({ email: req.params.email });
        return res.send(users);
      });

      //get all users
      updateRouter.get("/", async (req, res) => {
        const users = await User.find().sort({ firstname: 1 })
        return res.send(users)
      })
    module.exports = updateRouter