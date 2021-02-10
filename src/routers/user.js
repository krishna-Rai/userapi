const express = require('express')
const router = new express.Router()
const User = require('../models/user')


router.post('/users/create',async (req,res)=>{
    try {
        //console.log(req.body.email)
        let user = await User.findOne({email:req.body.email})
        //console.log(user)
        if(!user){
            user = new User(req.body)
            await user.save()
            return res.status(201).send(user)
        }
        res.status(400).send({error:"email is already taken"})

        
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})

router.get('/users',async (req,res)=>{
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.send(500).send({error:error.message})
    }
})

router.get('/users/:id',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(user){
            return res.send(user)
        }
        res.status(404).send({error:"No such user exist"})
    } catch (error) {
        res.status(500).send({error:error.message})
    }   
})

router.patch('/users/:id',async (req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id})
        console.log(user)
        if(user){
            const updates = Object.keys(req.body)
            updates.forEach((update)=>{
                user[update]=req.body[update]
            })
            await user.save()
            return res.send(user)
        }
        res.status(404).send({error:"no such user exist"})
    } catch (error) {
        console.log(error)
        if (error.name === 'MongoError' && error.code === 11000){
            return res.status(400).send({error:"Email id already taken"})
        }
        res.status(500).send({error:error.message})
    }
})
router.delete("/users/:id",async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).send({ error: "no such user" });
        }
        await user.remove()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports=router