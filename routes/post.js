const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

// router.use('/user',()=>{
//     console.log('User***')
// })

// router.use('/post',()=>{
//     console.log('Post***')
// })

router.post('/addPost', (req, res) => {
    console.log(req.headers)
    const bearerToken = req.headers.authorization
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, 'secretKey', (err, res) => {
        console.log('err ==> ', err)
        console.log('res ==> ', res)
    })
})

module.exports = router