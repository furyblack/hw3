
import {db} from "../db/db";
import {CreateNewBlogType} from "../types/blogs/input";
import {BlogBdType} from "../types/blogs/output";

export class BlogRepository{
     static getById(id: string) {
         return db.blogs.find((b:BlogBdType) => b.id === id)
     }


     static getAll():BlogBdType[] {
       return db.blogs
     }
// второе действие
    static createBlog(blogParams: CreateNewBlogType){
        const newBlog:BlogBdType ={
            id: (new Date()).toISOString(),
            name: blogParams.name,
            description: blogParams.description,
            websiteUrl: blogParams.websiteUrl
        }
        db.blogs.push(newBlog)

        return newBlog
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

