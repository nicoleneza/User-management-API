const { Schema } = require('mongoose')
const Joi = require('joi')

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


function loginUserValidation(user){
    const schema = Joi.object({
        username: Joi
                  .string()
                  .min(8)
                  .max(45)
                  .required(),
        password: Joi.string().min(8).max(45).required()
    })
}