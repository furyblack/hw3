import {blogCollection} from "../db/db";
import {CreateNewBlogType, UpdateBlogType} from "../types/blogs/input";
import {BlogOutputType, BlogMongoDbType} from "../types/blogs/output";
import * as crypto from "crypto";



export class BlogMapper {
    static toDto(blog:BlogMongoDbType):BlogOutputType{
        return {
            id: blog._id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            isMembership: false,
            createdAt: blog.createdAt.toISOString()
        }
    }
}
export class BlogRepository{
     static async getById(id: string):Promise<BlogOutputType | null> {
         const blog: BlogMongoDbType | null = await blogCollection.findOne({_id: id})
         if (!blog){
             return null
         }
         return BlogMapper.toDto(blog)
     }


    static async getAll():Promise<BlogOutputType[]> {
    const  blog = await blogCollection.find({}).toArray()
    return blog.map(b=>BlogMapper.toDto(b))

     }

    static async createBlog(blogParams: CreateNewBlogType): Promise<BlogOutputType>{
        const newBlog:BlogMongoDbType ={
            _id: crypto.randomUUID(),
            name: blogParams.name,
            description: blogParams.description,
            websiteUrl: blogParams.websiteUrl,
            createdAt: new Date()
        }

        await blogCollection.insertOne(newBlog)

        return BlogMapper.toDto(newBlog)
    }

    static async updateBlog(blogId: string, updateData:UpdateBlogType): Promise<boolean | null> {
    const blog = await BlogRepository.getById(blogId)
        if(!blog){
            return null
        }
        const updateResult = await blogCollection.updateOne({_id:blogId}, {$set:{...updateData}})
        const updatedCount = updateResult.modifiedCount
        if (updatedCount){
            return false
        }
        return true
     }


    static async deleteBlog(id: string): Promise<boolean> {
        try {
            const result = await blogCollection.deleteOne({ _id: id });
            return result.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting blog:", error);
            return false;
        }
    }


}

