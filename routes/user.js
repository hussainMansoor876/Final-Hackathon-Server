const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../model/Users')
const router = express.Router();

router.get('/get/:id', (req, res) => {
    console.log('Get', req.params.id)
    Users.findById({ _id: '5c40a9663313fb1ae0592755' })
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
    const hash = hashPassword(body.password)
    console.log("hash==>", hash)
    const newUser = new Users({ email: body.email, password: hash })
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

    const passwordMatched = bcrypt.compareSync(req.body.password, user[0].password)

    if (!passwordMatched) {
        res.send(500, { message: "Incorrcet Email/Password" })
        return
    }

    const token = jwt.sign({ user }, 'secretKey')
    console.log(token)
    res.send({ token })
})

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}



router.get('/find/:id', (req, res) => {
    Users.findById(req.param.id)
    .then((response) => {
        return res.send(response)
    })
})

router.post('/post', (request, response) => {
    const user = new Users(request.body);
    
    user.save()
    .then((res) => response.send({ message: 'User successfully Add' }))
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