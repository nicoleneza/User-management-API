
const mongoose = require('mongoose')


mongoose.set('strictQuery', true);
const URL ="mongodb://127.0.0.1:27017/users"
const connection = ()=>{
    try{
        mongoose.connect(URL,
     {
    useNewUrlParser :true,
    useUnifiedTopology : true,
    },
    ()=>console.log('connectes'))
    }
    catch(error){
        console.log('failed to connect',error)
    }
}

module.exports = connection
//.then(()=>console.log("connected ")).catch(err=>console.log("Failes to connect"))

