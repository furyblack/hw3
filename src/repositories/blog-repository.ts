import {blogCollection} from "../db/db";
import {CreateNewBlogType, UpdateBlogType} from "../types/blogs/input";
import {BlogOutputType, BlogMongoDbType} from "../types/blogs/output";
import {ObjectId, WithId} from "mongodb";



export class BlogMapper {
    static toDto(blog: WithId<BlogMongoDbType>):BlogOutputType{
        return {
            id: blog._id.toString(),
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
         const blog: WithId<BlogMongoDbType> | null = await blogCollection.findOne({_id: new ObjectId(id)})
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
           // _id: crypto.randomUUID(),
            name: blogParams.name,
            description: blogParams.description,
            websiteUrl: blogParams.websiteUrl,
            createdAt: new Date()
        }

        const res = await blogCollection.insertOne(newBlog)

        return BlogMapper.toDto({...newBlog, _id:res.insertedId})
    }

    static async updateBlog(blogId: string, updateData:UpdateBlogType): Promise<boolean> {

        const updateResult = await blogCollection.updateOne({_id:new ObjectId(blogId)}, {$set:{...updateData}})
        const updatedCount = updateResult.modifiedCount
        return !!updatedCount;

     }


    static async deleteBlog(id: string): Promise<boolean> {
        try {
            const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
            return result.deletedCount === 1;
        } catch (error) {
            console.error("Error deleting blog:", error);
            return false;
        }
    }


}

