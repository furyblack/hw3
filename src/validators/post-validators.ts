/*
import {body} from "express-validators";
import {BlogRepository} from "../repositories/blog-repository";
import {inputValidationMiddleware} from "../middlewares/inputValidation/input-validation-middleware";

const titleValidator = body('title').isString().withMessage('Title must be a string').trim().isLength({
    min: 1,
    max: 30
}).withMessage('Incorrect title')

const shortDescriptionValidator = body('Shortdescription').isString().withMessage('Shortdescription must be a string').trim().isLength({
    min: 0,
    max: 100
}).withMessage('Incorrect Shortdescription')

const contentValidator = body('Content').isString().withMessage('Content must be a string').trim().isLength({
    min: 1,
    max: 1000
}).matches( '^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$'
).withMessage('Incorrect Content')

const blogIdValidator = body('blogId').custom((value) => {
    const blog = BlogRepository.getById(value);

    if (!blog){
        throw Error ('Incorrect blogId')
    }
    return true

}
).withMessage('IncorrectblogId')

export const postValidation = () =>[titleValidator, shortDescriptionValidator, contentValidator, blogIdValidator, inputValidationMiddleware]


 */