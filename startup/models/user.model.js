const  mongoose  = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        min: 8,
        max: 45
    },

    lastname:{
        type:String,
        required: true,
        min: 8,
        max: 45
    },

    username:{
       type: String,
       required:true,
       min:8,
       max:45 
    },

    email: { 
        type: String,
        required: true,
        min:8,
        max: 45
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 45
    }
})
// userSchema.methods.generateAuthToken = function() {
//     const token = jwt.sign({
//         username : this.username,
//         password : this.password
//     },
//     config.get('jsonnicoletoken')
//     );
//     return token;
// }
const User = mongoose.model('User',userSchema)
module.exports=User