import {Router, Response, Request} from "express";

import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validators";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody} from "../types/common";
import {CreateNewBlogType} from "../types/blogs/input";

export const blogRoute  = Router({});


// blogRoute.get('/',  (req, res) => {
//     const  blogs = BlogRepository.getAll()
//     res.send(blogs)
// })

blogRoute.post('/', authMiddleware, blogValidation(), (req: RequestWithBody<CreateNewBlogType>, res: Response) => {
    const  {name, description, websiteUrl}:CreateNewBlogType = req.body
    const addResult = BlogRepository.createBlog({name, description, websiteUrl})

    res.send(addResult)
})
blogRoute.get('/blogs', authMiddleware, blogValidation(), (req: Request, res: Response, ) =>{
    const blogs = BlogRepository.getAll()
    res.send(blogs)
})

// blogRoute.put('/:id', (req:Request, res: Response)=>{
//     const isUpdated = BlogRepository.updateBlog(+req.params.id, req.body.title)
//     if (isUpdated){
//         const blog =BlogRepository.getById(+req.params.id)
//         res.send(product)
//     }
//
//     blogRoute.delete('/:id', (req:Request, res: Response)=> {
//         const isDeleted = BlogRepository.deleteBlog(+req.params.id)
//         if (isDeleted){
//             res.send(204)
//         }else{
//         res.send(404)}
//     }
// })