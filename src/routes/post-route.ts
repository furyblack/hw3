import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {RequestWithBody} from "../types/common";
import {Request, Response, Router} from "express";
import {PostDbType} from "../types/posts/output";
import {CreateNewPostType} from "../types/posts/input";

import {PostRepository} from "../repositories/post-repository";
import {postValidation} from "../validators/post-validators";
import {BlogBdType} from "../types/blogs/output";
import {BlogRepository} from "../repositories/blog-repository";
import {blogRoute} from "./blog-route";
export const postRoute = Router({})

postRoute.post('/', authMiddleware, postValidation(), (req: RequestWithBody<CreateNewPostType>, res: Response<PostDbType>) => {
    const  {title, shortDescription, content, blogId, blogName}:CreateNewPostType = req.body
    const addResult = PostRepository.createPost({title, shortDescription, content, blogId, blogName})

    res.send(addResult)
})
postRoute.get('/', (req: Request, res: Response<PostDbType[]> ) =>{
    const posts= PostRepository.getAll()
    res.send(posts)
})