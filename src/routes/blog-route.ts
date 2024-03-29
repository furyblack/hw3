import {Router, Response, Request} from "express";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogValidation} from "../validators/blog-validators";
import {BlogRepository} from "../repositories/blog-repository";
import {RequestWithBody} from "../types/common";
import {CreateNewBlogType, UpdateBlogType} from "../types/blogs/input";
import {BlogOutputType} from "../types/blogs/output";


export const blogRoute  = Router({});


blogRoute.post('/', authMiddleware, blogValidation(), async (req: RequestWithBody<CreateNewBlogType>, res: Response<BlogOutputType>) => {
    const  {name, description, websiteUrl}:CreateNewBlogType = req.body
    const addResult: BlogOutputType = await BlogRepository.createBlog({name, description, websiteUrl})

    res.status(201).send(addResult)
})
blogRoute.get('/', async (req: Request, res: Response<BlogOutputType[]> ) =>{
    const blogsPromise = await BlogRepository.getAll()
    res.send(blogsPromise)
})
blogRoute.put('/:id', authMiddleware, blogValidation(), async (req:Request, res: Response)=> {
    const blogUpdateParams: UpdateBlogType = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }
    const blogId =  req.params.id

    const isUpdated = await BlogRepository.updateBlog(blogId, blogUpdateParams)
    if (isUpdated) return res.sendStatus(404)

    return res.sendStatus(204)
})

blogRoute.delete('/:id', authMiddleware, (req:Request, res: Response)=> {

    const isDeleted = BlogRepository.deleteBlog(req.params.id)
        if (isDeleted){
             res.sendStatus(204)
         }else{
         res.sendStatus(404)}

 })

blogRoute.get('/:id', async (req:Request, res: Response) =>{
    const blogId = await BlogRepository.getById(req.params.id)
    if (blogId){
        res.status(200).send(blogId)
    }else {
        res.sendStatus(404)
    }
})