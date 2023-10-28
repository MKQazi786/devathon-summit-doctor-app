import express from 'express';

let router = express.Router()

router.get('/signup', (req, res, next) => {
    console.log("you have succesfully signup V1", + new Date())
    res.send("you have succesfully signup V1 " + new Date())
})

router.get('/login', (req, res, next) => {
    console.log("you have succesfully login v1 ", + new Date())
    res.send("you have succesfully login v1 " + new Date())
})

export default router
