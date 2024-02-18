import express, {Request, Response} from 'express'
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {PostRepository} from "./repositories/post-repository";
import {db} from "./db/db";
import {app} from "./settings";
const port=3000


app.listen(port, () =>
{
    console.log(`App start on port ${port}`)
})

