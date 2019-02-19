const express = require('express');
const jwt = require('jsonwebtoken')
const Users = require('../model/Users')
const router = express.Router();

router.get('/get/:id', (req, res) => {
    console.log('Get', req.params.id)
    console.log('body',req.body)
    Users.find({ loginId: req.params.id })
        .then((response) => {
            return res.send(response)
        })
        .catch(e => console.log(e))
})

router.get('/getAll', (req, res) => {
    Users.find({})
        .then((response) => {
            return res.send(response)
        })
        .catch(e => console.log(e))
})

router.delete('/del', (req, res) => {
    const { body } = req;
    console.log(body)

    Users.deleteOne({ name: body.name })
        .then((response) => {
            console.log('im running')
            res.send({ message: 'User deleted', response })
        })
        .catch(e => res.send({ message: e.message }))
})

router.put('/put', (req, res) => {
    const { body } = req;
    console.log(body)

    Users.updateOne({ name: "Hussain" }, { name: body.name })
        .then((response) => {
            console.log('im running')
            res.send({ message: 'User Update Successfully', response })
        })
        .catch(e => res.send({ message: e.message }))
})

router.post('/register', (req, res) => {
    const { body } = req;
    // Users.find({})
    console.log('body',body)
    const newUser = new Users({ email: body.email, name: body.name,avator: body.photoUrl, loginId: body.loginId })
    newUser.save()
        .then(() => res.send({ message: "User Register Successfully!" }))
        .catch(e => res.send(500, { message: e.message }))

})

router.post('/login', async (req, res) => {
    const user = await Users.find({ email: req.body.email })
    if (!user.length) {
        res.send(500, { message: "User not found" })
        return
    }

    const token = jwt.sign({ user }, 'secretKey')
    console.log(token)
    res.send({ token })
})



router.get('/find/:id', (req, res) => {
    Users.findById(req.param.id)
    .then((response) => {
        return res.send(response)
    })
})

router.post('/post', (request, response) => {
    const user = new Users(request.body);
    
    user.save()
    .then((res) => response.send({ message: 'Sign Up Successfully' }))
    .catch(e => response.send(500, { message: e.message }))
    // console.log(request.body)
    // console.log('Post***')
    // response.send({name: 'Mansoor',email:'hussain@gmail.com'})
})

// router.post('/del',(req,res)=>{
//     const { body } = req;
//     console.log(body)

//     Users.update({ email: body.email}, {name: body.name})
//     .then((response)=>{
//         console.log('im running')
//         res.send({ message: 'User deleted', response })
//     })
//     .catch(e => res.send({message: e.message}))
// })

// router.delete('/del/:id',(req,res)=>{
//     const users = new Users(req.body)
//     users.deleteOne({_id: req.param.id})
//     .then((response)=>{
//         return res.send("Succesfully delete")
//     })
// })

module.exports = router