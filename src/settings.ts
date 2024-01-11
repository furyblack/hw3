import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

const AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

type VideoDbType = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: typeof AvailableResolutions;
}

let videos: VideoDbType[] = [
    {
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
    }

];
type RequestWithParams<P> = Request<P, {}, {}, {}>;
type RequestWithBody<B> = Request<{}, {}, B, {}>;

type CreateVideoType = {
    title: string;
    author: string;
    availableResolutions: typeof AvailableResolutions;

};
type ErrorMessages = {
    message: string;
    field: string;
};
type ErrorType = {
    errorMessages: ErrorMessages[];
};

app.get('/videos', (_req: Request<{}, {}, CreateVideoType>, res: Response) => {
    _req.body.author
    res.send(videos);
});

app.delete('/testing/all-data', (_req: Request, res: Response) => {
    videos.length = 0;
    res.sendStatus(204);
});

app.delete('/videos/:videoId', (req: Request, res: Response) => {
    const id = +req.params.videoId
    const newVideos=videos.filter(v=>v.id !==id)
    if (newVideos.length < videos.length){
        videos = newVideos
        res.send(204)
    }else{
        res.send(404)
    }
})



app.get('/videos/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = +req.params.id
    const video = videos.find((v) => v.id === id)

    if (!video) {
        res.sendStatus(404)
        return
    }
    res.send(video)
})


app.put('/videos/:videoId', (req:Request, res:Response)=>{
    let title = req.body.title
    if (!title || typeof title !== 'string' || !title.trim() || title.length>40){
        res.status(400).send({
            errorsMessages:[{
                message:'Incorrect title',
                field: 'title'
            }],
            resultCode:1
        })
        return
    }
    const id = +req.params.videoId
    const video = videos.find(v=> { return v.id === id})

    if (video){
        video.title = title;
        res.status(204).send(video)


    }else{
        res.send(404)
    }
})



app.post('/videos', (req: RequestWithBody<CreateVideoType>, res: Response) => {
    let errors: ErrorType = {
        errorMessages: []

    }
    let {title, author, availableResolutions}:CreateVideoType = req.body

if (!title || typeof title !=='string' || !title.trim() || title.trim().length > 40) {
        errors.errorMessages.push({message: 'Invalid title!', field: 'title'})
    }

    if (!author || typeof author !=='string' || !author.trim() || author.trim().length > 20) {
        errors.errorMessages.push({message: 'Invalid author!', field: 'author'})
    }

    if (availableResolutions && Array.isArray(availableResolutions)) {
        availableResolutions.forEach(r => {
            !AvailableResolutions.includes(r) && errors.errorMessages.push({
                message: 'Invalid avalableResolutions!',
                field: 'avalableResolutions'
            })
        })
    } else {
        availableResolutions = []
    }
    if (errors.errorMessages.length) {
        res.status(400).send(errors)
        return
    }

    const  createdAt=new Date()
    const publicationDate=new Date()

    publicationDate.setDate(createdAt.getDate()+1)

    const newVideo: VideoDbType = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    }

    videos.push(newVideo)

    res.status(201).send(newVideo)

})