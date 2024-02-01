import express from 'express'
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
export const app = express();
const port=3000

// подключение роутеров
app.use(express.json())
app.use('/posts', postRoute)
app.use('/blogs', blogRoute)



app.listen(port, () =>
{
    console.log(`App start on port ${port}`)
})
