const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')

const dbURI = "mongodb+srv://test:test@cluster0.mkrba.mongodb.net/userapi?retryWrites=true&w=majority"
const app = express()
app.use(express.json())
app.use(userRouter)
const port = process.env.PORT || 3000;

mongoose.connect(dbURI,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then((result)=>{
    console.log("db connection established")
    app.listen(port,()=>{
        console.log("Server is up on port "+port)
    })
}).catch((err)=>{
    console.log(err)
})

