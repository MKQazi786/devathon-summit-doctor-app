import express from 'express';
let router = express.Router()

router.get('/feed/:userid', (req, res, next) => {
    console.log("your feed is created", + new Date())
    res.send("your feed is created" + new Date())
})

export default router
