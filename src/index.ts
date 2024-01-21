import express from "express"
import http from "http"
import cors from "cors"
import bodyParser from "body-parser"
import cockieParser from "cookie-parser"
import compression from "compression"
import dotenv from "dotenv"
import mongoose from "mongoose"
import router from "./router"

dotenv.config();



const app = express()


const port : any = process.env.PORT || 3030

app.use(cors({
    credentials:true
}))

app.use(compression())
app.use(cockieParser())
app.use(bodyParser.json())

const server = http.createServer(app)


server.listen(3000,() => console.log(`Server is running on port ${port}`))

 mongoose.Promise = Promise

 
 
mongoose.connect(process.env.MONGO_URL as string )

mongoose.connection.on("error", (error: Error) => {console.log("error: ", error)})


app.use("/",router())