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

router.get('/getAll/:id', (req, res) => {
    Users.find({id: {$ne: req.params.id}})
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
        .then((response) => {
            res.send({ message: 'Service Update Successfully' })
        })
        .catch(e => res.send({ message: e.message }))
})


router.post('/post', (request, response) => {
    const user = new Users(request.body);
    
    user.save()
    .then((res) => response.send({ message: 'Sign Up Successfully' }))
    .catch(e => response.send(500, { message: e.message }))
})

router.post('/service', (request, response) => {
    console.log(request.body)
    const { body } = request
    Users.find({services: {$elemMatch: {name: body.name, type: true}}})
    .then((res) => response.send(res))
    .catch(e => response.send(500, { message: e.message }))
})

router.put('/chat', (request, response) => {
    console.log(request.body)
    response.send({message: "Done Hogya"})
})




module.exports = router