
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



    // static deleteBlog(id: number){
    //     for (let i =0; i<blogs.length; i++){
    //         if(blogs[i].id === id){
    //             blogs.splice(i,1)
    //             return  true;
    //         }
    //     }
    //     return false
    // }

    // static updateBlog(id: number, title: string){
    //     let blog = blogs.find(b=> b.id === id)
    //     if (blog){
    //         blog.title = title
    //         return true;
    //
    //     }else{
    //         return false
    //     }
    // }
}

