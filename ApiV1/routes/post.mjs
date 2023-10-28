import express from 'express';
import { nanoid } from 'nanoid'
import {client} from './../../mongodb.mjs'
import { ObjectId } from 'mongodb'


const db = client.db("devathon")
const col = db.collection("appointment");

let posts = [
    {
        id: nanoid(),
        title: "Muhammad! muhammad Khubaib naam hai mera! ",
        text: "me jhuke ga nhi saala"
    }
]



let  router = express.Router()

router.post('/post', async (req, res, next) => {
    console.log("your post is SUCCESFULLY POSTED !", + new Date())

    if (!req.body.title || !req.body.text) {
        res.status(403)
        res.send(`required parameter is missing,
        example request body:
        {
            title: "Muhammad! muhammad Khubaib naam hai mera! ",
            text: "me jhuke ga nhi saala"
        }`
        )
        return
    }
    
    const insertResponse = await col.insertOne({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    });
    
    console.log("insertResponse: ", insertResponse)

    res.send("your post is SUCCESFULLY POSTED! " + new Date())
})


router.get('/posts', async (req, res, next) => {
    const cursor = col.find({});
    let results = await cursor.toArray()
    console.log("results: ", results);
    res.send(results);
})

router.get('/post/:postId', (req, res, next) => {

    if (!req.params.postId) {
        res.status(403).send(`post id is must be valid id `)
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === Number(req.params.postId)) {
            res.send(posts[i])
            return
        }
    }
    
    res.send("post not found with id " + req.params.postId + ' ' + new Date())
    console.log(`you get a post with this ${req.params.postId}`, + new Date())
})

router.put('/post/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    if (!req.body.text
        && !req.body.title) {
        res.status(403).send(`required parameter missing, atleast one key is required.
        example put body: 
        PUT     /api/v1/post/:postId
        {
            title: "updated title",
            text: "updated text"
        }
        `)
    }

    let dataToBeUpdated = {};

    if (req.body.title) { dataToBeUpdated.title = req.body.title }
    if (req.body.text) { dataToBeUpdated.text = req.body.text }


    try {
        const updateResponse = await col.updateOne(
            {
                _id: new ObjectId(req.params.postId)
            },
            {
                $set: dataToBeUpdated
            });
        console.log("updateResponse: ", updateResponse);

        res.send('post updated');
    } catch (e) {
        console.log("error inserting mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})

router.delete('/post/:postId', async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    try {
        const deleteResponse = await col.deleteOne({ _id: new ObjectId(req.params.postId) });
        if (deleteResponse.deletedCount === 1) {
            res.send('post deleted');
        console.log("deleteResponse: ", deleteResponse);}

    } catch (error) {
        console.log("error deleting mongodb: ", error);
        res.status(500).send('server error, please try later');
    }
})


export default router