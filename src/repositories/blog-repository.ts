import {blogCollection, db} from "../db/db";
import {CreateNewBlogType, UpdateBlogType} from "../types/blogs/input";
import {BlogOutputType, BlogMongoDbType} from "../types/blogs/output";
import * as crypto from "crypto";
import now = jest.now;
export class BlogMapper {
    static toDto(blog:BlogMongoDbType):BlogOutputType{
        return {
            id: blog._id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
    }
}
export class BlogRepository{
     static async getById(id: string):Promise<BlogOutputType | null> {
         const blog = db.blogs.find((b:BlogOutputType) => b.id === id)
         if (!blog){
             return null
         }
         return blog
     }

     static async getAll():Promise<BlogOutputType[]> {
       return db.blogs
     }

    static async createBlog(blogParams: CreateNewBlogType): Promise<BlogOutputType>{
        const newBlog:BlogMongoDbType ={
            _id: crypto.randomUUID(),
            name: blogParams.name,
            description: blogParams.description,
            websiteUrl: blogParams.websiteUrl
        }

        const addResult = await blogCollection.insertOne(newBlog)

        return BlogMapper.toDto(newBlog)
    }


    static async updateBlog(blogId: string, updateData:UpdateBlogType): Promise<boolean | null> {
    const blog = await BlogRepository.getById(blogId)
        if(!blog){
            return null
        }
        const updateResult = await blogCollection.updateOne({_id:blogId}, updateData)
        const updatedCuont = updateResult.modifiedCount
        if (!updatedCuont){
            return false
        }
        return true
     }


    static deleteBlog(id: string){
         for (let i =0; i<db.blogs.length; i++){

             if(db.blogs[i].id === id){
                 db.blogs.splice(i, 1)
                 return  true;
             }
       }
         return false
    }




}

