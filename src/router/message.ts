import express from "express"
import { createNewMessage, readMessages } from "../controller/message"
import {isAuthenticated, isTheOwner} from "../middleware/index"

export default (router : express.Router) => {
    router.post("/messages",isAuthenticated, createNewMessage)
    router.get("/messages",isAuthenticated, readMessages)
}