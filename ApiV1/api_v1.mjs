import express from "express";

let router = express.Router()

import  authRouter  from "./routes/auth.mjs";
import commentRouter from "./routes/comment.mjs";
import feedRouter from "./routes/feed.mjs";
import postRouter  from "./routes/post.mjs";


router.use("/api/v1", authRouter)

const app = express();

app.use((req, res, next) => {
    const token = "valid"
    if (token === "valid") {
        next();
    } else {
        res.send({ message: "invalid token" })
    }
})


router.use("/api/v1", commentRouter)

router.use("/api/v1", feedRouter)

router.use("/api/v1", postRouter)


export default router