import {Router, Response, Request} from "express";

import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validators";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody} from "../types/common";
import {CreateNewBlogType} from "../types/blogs/input";
import {BlogOutputType} from "../types/blogs/output";


export const blogRoute  = Router({});



// первое действие,
blogRoute.post('/', authMiddleware, blogValidation(), async (req: RequestWithBody<CreateNewBlogType>, res: Response<BlogOutputType>) => {
    const  {name, description, websiteUrl}:CreateNewBlogType = req.body
    const addResult: BlogOutputType = await BlogRepository.createBlog({name, description, websiteUrl})

    res.status(201).send(addResult)
})
blogRoute.get('/', (req: Request, res: Response<BlogOutputType[]> ) =>{
    const blogs = BlogRepository.getAll()
    res.status(200).send(blogs)
})



blogRoute.put('/:id', authMiddleware, blogValidation(), (req:Request, res: Response)=> {


    const isUpdated = BlogRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (isUpdated) {
        res.sendStatus(204)

    } else {
        res.sendStatus(404)
    }
})



blogRoute.delete('/:id', authMiddleware, (req:Request, res: Response)=> {

    const isDeleted = BlogRepository.deleteBlog(req.params.id)
        if (isDeleted){
             res.sendStatus(204)
         }else{
         res.sendStatus(404)}

 })

blogRoute.get('/:id', (req:Request, res: Response) =>{
    const blogId = BlogRepository.getById(req.params.id)
    if (blogId){
        res.status(200).send(blogId)
    }else {
        res.sendStatus(404)
    }
})