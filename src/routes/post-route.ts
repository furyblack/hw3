import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {RequestWithBody} from "../types/common";
import {Request, Response, Router} from "express";
import {PostDbType} from "../types/posts/output";
import {CreateNewPostType} from "../types/posts/input";

import {PostRepository} from "../repositories/post-repository";
import {postValidation} from "../validators/post-validators";

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

blogRoute.put('/:id', (req:Request, res: Response)=> {


    const isUpdated = PostRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogName, req.body.blogId)
    if (isUpdated) {
        res.sendStatus(204)

    } else {
        res.sendStatus(404)
    }
})

postRoute.delete('/:id', (req:Request, res:Response) => {
    const isDeleted = PostRepository.deletePost(req.params.id)
    if (!isDeleted){
        res.sendStatus(404)
    }else{
        res.sendStatus(204)
    }
})

postRoute.get('/:id', (req:Request, res: Response)=>{
    const postId = PostRepository.getById(req.params.id)
    if(postId){
        res.sendStatus(200)
    }else {
        res.sendStatus(404)
    }
})

postRoute.delete('/testing/all-data', (req:Request, res: Response)=>{
    const deletePosts = PostRepository.deleteAllPosts(req.params.id)
    res.sendStatus(204)
})