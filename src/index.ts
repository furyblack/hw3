
import {app} from "./settings";
import {connectMongo, db} from "./db/db";
import dotenv from 'dotenv'




//const jsonBodyMiddleware = bodyParser.json()
dotenv.config()
const port= process.env.PORT as string



    app.listen(port, async ()=>{
        await connectMongo()
        console.log(`example app listening on port ${port}`)
    })





