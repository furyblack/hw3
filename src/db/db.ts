import {BlogBdType} from "../types/blogs/output";


import {VideoDbType} from "../types/videos/output";
import {CreateNewPostType} from "../types/posts/input";
import {PostDbType} from "../types/posts/output";

type DbType = {
    blogs: BlogBdType[],
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