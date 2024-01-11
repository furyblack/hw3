"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
let videos = [
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
exports.app.get('/videos', (_req, res) => {
    _req.body.author;
    res.send(videos);
});
exports.app.delete('/testing/all-data', (_req, res) => {
    videos.length = 0;
    res.sendStatus(204);
});
exports.app.delete('/videos/:videoId', (req, res) => {
    const id = +req.params.videoId;
    const newVideos = videos.filter(v => v.id !== id);
    if (newVideos.length < videos.length) {
        videos = newVideos;
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.app.get('/videos/:id', (req, res) => {
    const id = +req.params.id;
    const video = videos.find((v) => v.id === id);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    res.send(video);
});
exports.app.put('/videos/:videoId', (req, res) => {
    let title = req.body.title;
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        res.status(400).send({
            errorsMessages: [{
                    message: 'Incorrect title',
                    field: 'title'
                }],
            resultCode: 1
        });
        return;
    }
    const id = +req.params.videoId;
    const video = videos.find(v => { return v.id === id; });
    if (video) {
        video.title = title;
        res.status(204).send(video);
    }
    else {
        res.send(404);
    }
});
exports.app.post('/videos', (req, res) => {
    let errors = {
        errorMessages: []
    };
    let { title, author, availableResolutions } = req.body;
    if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
        errors.errorMessages.push({ message: 'Invalid title!', field: 'title' });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
        errors.errorMessages.push({ message: 'Invalid author!', field: 'author' });
    }
    if (availableResolutions && Array.isArray(availableResolutions)) {
        availableResolutions.forEach(r => {
            !AvailableResolutions.includes(r) && errors.errorMessages.push({
                message: 'Invalid avalableResolutions!',
                field: 'avalableResolutions'
            });
        });
    }
    else {
        availableResolutions = [];
    }
    if (errors.errorMessages.length) {
        res.status(400).send(errors);
        return;
    }
    const createdAt = new Date();
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);
    const newVideo = {
        id: +(new Date()),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    };
    videos.push(newVideo);
    res.status(201).send(newVideo);
});
