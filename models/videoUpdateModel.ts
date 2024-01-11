import {AvailableResolutions} from "../src/settings";

export type VideoUpdateModelBody =  {

    "title": string,
    "author": string,
    "availableResolutions": typeof AvailableResolutions
,
    "canBeDownloaded": boolean,
    "minAgeRestriction": number | null,
    "publicationDate": string
}

export type VideoUpdateModelParams = {
    "id": string
}
