import express from 'express';
let router = express.Router()

router.get('/comment/:postId/:commentId', (req, res, next) => {
    console.log("your comment is here of this post! ", + new Date())
    res.send("your comment is here of this post! " + new Date())
})

router.get('/comments/:postId', (req, res, next) => {
    console.log("your all comment is here of this post! ", + new Date())
    res.send("your all comment is here of this post! " + new Date())
})

router.put('/comment/:postId/:commentID', (req, res, next) => {
    console.log("your comment is SUCCESFULLY updated", + new Date())
    res.send("your comment is SUCCESFULLY updated" + new Date())
})

router.delete('/comment/:postId/:commentId', (req, res, next) => {
    console.log("your comment is deleted", + new Date())
    res.send("your comment is deleted" + new Date())
})

export default router
