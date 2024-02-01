import {CreateNewBlogType} from "../types/blogs/input";
import {BlogBdType} from "../types/blogs/output";
import {db} from "../db/db";
import {CreateNewPostType} from "../types/posts/input";
import {PostDbType} from "../types/posts/output";

export class PostRepository{
    static createPost(postParams: CreateNewPostType){
        const newPost:PostDbType ={
            id: (new Date()).toISOString(),
            title: postParams.title,
            shortDescription: postParams.shortDescription,
            content: postParams.content,
            blogId: postParams.blogId,
            blogName: postParams.blogName
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
}
