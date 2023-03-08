const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
// const swaggerDoc = require('./swagger.json')
const config = require('config')
const bodyparser = require('body-parser')
const auth= require('./startup/models/verifyToken')
const app = express()
const registerRouter = require('./routes/regitserRoute.js');
const loginRouter = require('./routes/loginRoute.js');
const updateRouter = require('./routes/updateRouter')
const deleteRoute = require('./routes/deleteRoute')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/welcome',(req, res) => {
    res.sendFile(__dirname + '/views/welcome.html');
})
app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/views/register.html')
})
// app.use(express.static('./views/register'))

// app.use("/swagger-ui.html", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// app.use(express.json())

app.use('/',registerRouter)
app.use('/',loginRouter)
app.use('/',updateRouter)
app.use('/',deleteRoute)
 const connection = require('./startup/models/dbConnection')
 connection()
 if (!config.get("jsonnicoletoken")) {
     console.log("JWT PRIVATE KEY IS NOT DEFINED");
     process.exit(1);
  }
app.listen(process.env.PORT||4000,()=>{
    console.log(`the server is running on port ${process.env.PORT || 4000}...`)
})
