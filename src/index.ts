import express, {Request, Response} from 'express'
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {PostRepository} from "./repositories/post-repository";
import {db} from "./db/db";
export const app = express();
const port=3000

// подключение роутеров
app.use(express.json())
app.use('/posts', postRoute)
app.use('/blogs', blogRoute)

app.delete('/testing/all-data', (req:Request, res: Response)=>{
    db.blogs.length=0
    db.posts.length=0
    res.sendStatus(204)
})

app.listen(port, () =>
{
    console.log(`App start on port ${port}`)
})

