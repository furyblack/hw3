
import express, {Request, Response} from 'express'
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {PostRepository} from "./repositories/post-repository";
import {db} from "./db/db";

import dotenv from 'dotenv'


import {app} from "./settings";
dotenv.config()
const port= process.env.PORT as string


app.listen(port, () =>
{
    console.log(`App start on port ${port}`)
})

