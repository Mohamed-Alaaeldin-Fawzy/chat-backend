import express from "express"
import {merge, get} from "lodash"
import {getUserBySessionToken} from "../controller/userRepo"

export const isTheOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {id} = req.params;
        const currentUserId = get(req, "user._id") as string;
        if(!currentUserId){
            return res.sendStatus(403)
        }
        if(id !== currentUserId.toString()){
            return res.sendStatus(403)
        }
        return next()
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies["auth-token"]
        if(!sessionToken){
            return res.status(403).send("no token");
        }
        const user = await getUserBySessionToken(sessionToken);
        if(!user){
            return res.status(403).send("no user with this token");
        }
        merge(req, {user});
        console.log(req)
        return next();
    } catch (error) {
        res.status(500).send(error)
    }
   
}