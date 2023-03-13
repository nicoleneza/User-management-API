const deleteRoute= require('express').Router()
 const user = require('../startup/models/user.model').default
// const Joi = require('@hapi/joi')
const User = require('../startup/models/user.model')
// const bcrypt = require('bcrypt')
const { Schema } = require('mongoose')
 const dotenv = require('dotenv')
dotenv.config()

deleteRoute.delete('/:email', (req, res) => {
    User.findOneAndDelete(req.params.email)
        .then(User => res.send('deleteed!'))
        .catch(err => res.send(err).status(404));
    });
    

module.exports = deleteRoute