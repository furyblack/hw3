import {Router, Response, Request} from "express";

import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validators";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody} from "../types/common";
import {CreateNewBlogType} from "../types/blogs/input";
import {BlogBdType} from "../types/blogs/output";


export const blogRoute  = Router({});



// первое действие,
blogRoute.post('/', authMiddleware, blogValidation(), (req: RequestWithBody<CreateNewBlogType>, res: Response<BlogBdType>) => {
    const  {name, description, websiteUrl}:CreateNewBlogType = req.body
    const addResult = BlogRepository.createBlog({name, description, websiteUrl})

    res.send(addResult)
})
blogRoute.get('/', (req: Request, res: Response<BlogBdType[]> ) =>{
    const blogs = BlogRepository.getAll()
    res.send(blogs)
})



blogRoute.put('/:id', (req:Request, res: Response)=> {


    const isUpdated = BlogRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (isUpdated) {
        res.sendStatus(204)

    } else {
        res.sendStatus(404)
    }
})



blogRoute.delete('/:id', (req:Request, res: Response)=> {

    const isDeleted = BlogRepository.deleteBlog(req.params.id)
        if (isDeleted){
             res.send(204)
         }else{
         res.send(404)}

 })

blogRoute.get('/:id', (req:Request, res: Response) =>{
    const blogId = BlogRepository.getById(req.params.id)
    if (blogId){
        console.log('if ushel')
        res.send(200)
    }else {
        res.send(404)
    }
})