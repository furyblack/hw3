
import * as dotenv from "dotenv";
import {BlogOutputType, BlogMongoDbType} from "../types/blogs/output";
import {VideoDbType} from "../types/videos/output";

import {PostDbType} from "../types/posts/output";
import {Collection, MongoClient} from "mongodb";


type DbType = {
    blogs: BlogOutputType[],
    videos: VideoDbType[],
    posts: PostDbType[]
}
export const db:DbType = {
    blogs: [{
        "id": "0",
        "name": "firstblog",
        "description": "description of first blog",
        "websiteUrl": "@mail.ru"
    }],
    videos: [{
        id: 0,
        title: 'string',
        author: 'string',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2024-01-07T08:53:23.637Z",
        publicationDate: "2024-01-07T08:53:23.637Z",
        availableResolutions: [
            "P144"
        ]
    }],
    posts: [{
        "id": "00",
        "title": "titlefirsstpost",
        "shortDescription": "desc of first post",
        "content": "content of first post",
        "blogId": "0",
        "blogName": "string"
    }
    ],
}



//пытаюсь подключить бд

dotenv.config()
const mongoUri = process.env.MONGO_URL as string  // вытащили из енви строку  подключения

export const client = new MongoClient(mongoUri);
const mongoDb = client.db()

 export const blogCollection: Collection<BlogMongoDbType> = mongoDb.collection<BlogMongoDbType>('blog')
// export const postCollection: Collection<PostDbType> = db.collection<PostDbType>(SETTINGS.POST_COLLECTION_NAME)
export async  function connectMongo (){
    try{
        await client.connect()
        return true
    }catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}
