import express from "express"
import { login, register, getAllUsers, updateCurrentUser, deleteUser } from "../controller/user"
import {isAuthenticated, isTheOwner} from "../middleware/index"

export default (router : express.Router) => {
    router.post("/register", register)
    router.post("/login", login)
    router.get("/users", isAuthenticated ,getAllUsers)
    router.put("/users", isAuthenticated,isTheOwner ,updateCurrentUser)
    router.delete("/users/:id", isAuthenticated,isTheOwner ,deleteUser)
}