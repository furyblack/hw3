
import {db} from "../db/db";
import {CreateNewPostType} from "../types/posts/input";
import {PostDbType} from "../types/posts/output";
import {BlogRepository} from "./blog-repository";

export class PostRepository{
    static createPost(postParams: CreateNewPostType){
        const targetBlog = BlogRepository.getById(postParams.blogId)

        const newPost:PostDbType ={
            id: (new Date()).toISOString(),
            title: postParams.title,
            shortDescription: postParams.shortDescription,
            content: postParams.content,
            blogId: postParams.blogId,
            blogName: targetBlog!.name
        }
        db.posts.push(newPost)

        return newPost
    }

    static getById(id: string) {
             return db.posts.find((p:PostDbType) => p.id ==id)
         }

    static getAll():PostDbType[] {
        return db.posts
    }
    static  updatePost(id: string, title: string, shortDescription: string, content: string, blogId:string ){
        const postIndex = db.posts.findIndex(p =>p.id === id)
        const post = this.getById(id)
        if (!post) return null
        const newPost = {
            ...post,
            title: title, shortDescription: shortDescription, content: content, blogId: blogId
        }

        db.posts.splice(postIndex, 1, newPost)
        return true
    }

    static deletePost(id: string){
        for (let i =0; i<db.posts.length; i++){

            if(db.posts[i].id === id){
                db.posts.splice(i, 1)
                return  true;
            }
        }
        return false
    }
    static deleteAllPosts(id:string){
        const delPosts = db.posts.length=0
        if (delPosts) {
            return false
        } else {
            return true
        }
    }

}
