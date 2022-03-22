// env config
require('dotenv').config()
// db connection import
require('../dbConnection')

// imports
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.use(bodyParser.json())

// importing db schema
const UserModel = require('../Schema/user')

// middleware for token verification
const verifyToken = (req, res, next) => {

    let token = req.headers.authorization.split(' ')[1];

    if(!token)
       return res.status(200).send({err: "Unauthorized Request"});

    try {
        jwt.verify(token, process.env.SECRET_KEY_ON_SERVER);
        next()
    }catch(err) {
       return res.status(200).send({err: "Unauthorized Request"});
    }
}

// handle session
router.post('/session', verifyToken, (req, res) => {
    res.status(200).send({response: "true"})
})

// handling signin
router.post('/signin', async (req, res)=> {
    // destructing request params
    const {id, password, adminStatus} = req.body

    // check if user exists
    const user = await UserModel.find().then((userList)=> {
        return userList.find((user)=> user.id === id);
    })

    if(user===undefined)
        return res.send({"error" : "User Doesn't Exists"});
    else {
        // user exists
        // check password
        let flag = bcrypt.compare(password, user.password, (err, result)=> {
            if(adminStatus != user.adminStatus)
                return res.send({"error" : "Invalid Credentials"});
            if(!result)
                return res.send({"error" : "Invalid Credentials"});
            else {
                // creating jwt token
                let payload = {"id" : user.id};
                let token = jwt.sign(payload, process.env.SECRET_KEY_ON_SERVER,{
                    expiresIn: '1h'
                })
                return res.status(200).send({token})
            }    
        });

        
    }
})

// handling register
router.post('/register', async (req, res)=> {
    // destructing request params
    const {id, password, adminStatus} = req.body

    // check if user exists
    const user = await UserModel.find().then((userList)=> {
        return userList.find((user)=> user.id === id);
    })

    if(user)
        return res.status(400).send({"error": "User already Exists !"})
        
    let encryptedPass = await bcrypt.hash(password, 10);
    let newUser = new UserModel({id, "password": encryptedPass, adminStatus});

    newUser.save((err, registeredUser) => {
        if(err)
            return res.status(400).send(err);
        else {
            let payload = {"id" : registeredUser.id};
            let token = jwt.sign(payload, process.env.SECRET_KEY_ON_SERVER, {
                expiresIn: "1h"
            })
            return res.status(200).send({token})
        }
    });
})

module.exports = router;