//import {describe, it} from "node:test";
import request from 'supertest'
import {app} from "../../src/settings";


describe ('/videos', () =>{
    it('should return 200', () => {
        request(app)
            .get('/videos')
            .expect(200,)
    });

    it('should return 200 ', () => {
        request(app)
            .get('/videos/:id')
            .expect(200,)
    });



})