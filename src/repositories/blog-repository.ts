
import {blogCollection, db} from "../db/db";
import {CreateNewBlogType} from "../types/blogs/input";
import {BlogOutputType, BlogMongoDbType} from "../types/blogs/output";
import * as crypto from "crypto";
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
     static getById(id: string) {
         return db.blogs.find((b:BlogOutputType) => b.id === id)
     }


     static getAll():BlogOutputType[] {
       return db.blogs
     }
// второе действие
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



    static updateBlog(id: string, name: string, description: string, websiteUrl: string){
      const blogIndex = db.blogs.findIndex(b =>b.id === id)
        const blog = this.getById(id)
        if (!blog) return null
        const newBlog = {
          ...blog,
            name: name, description: description, websiteUrl: websiteUrl
        }
        db.blogs.splice(blogIndex, 1, newBlog)
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

