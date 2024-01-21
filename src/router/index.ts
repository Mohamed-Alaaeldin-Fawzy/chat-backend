import express from "express"
import user from "./user"
import message from "./message"

const router = express.Router()

export default (): express.Router => {
    user(router as express.Router)
    message(router as express.Router)
    return router
}