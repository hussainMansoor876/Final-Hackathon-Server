const express = require('express');
const jwt = require('jsonwebtoken')
const Users = require('../model/Users')
const router = express.Router();

router.get('/get/:id', (req, res) => {
    console.log('Get', req.params.id)
    console.log('body',req.body)
    Users.find({ id: req.params.id })
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

router.put('/updateService/:id', (req, res) => {
    const { body } = req;
    const { id } = req.params
    Users.findOneAndUpdate(id, { services: body.services })
        .then(() => {
            Users.find(id)
            .then((response) => {
                res.send({ message: 'User Update Successfully', response })
            })
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

router.post('/post', (request, response) => {
    const user = new Users(request.body);
    
    user.save()
    .then((res) => response.send({ message: 'Sign Up Successfully' }))
    .catch(e => response.send(500, { message: e.message }))
})



module.exports = router