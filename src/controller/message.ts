import express from "express"
import {get} from "lodash"
import { createMessage,getMessages,deleteMessageById,updateMessage } from "./messageRepo"

export const createNewMessage = async (req: express.Request, res: express.Response) => {
    try {
        const { message } = req.body
        const userId = get(req, "user._id") as string;
        if (!message ) {
            return res.status(403)
        }
        const newMessage = await createMessage({
           message,
           user:userId
        })
        return res.status(200).send(newMessage)
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

export const readMessages = async (req: express.Request, res: express.Response) => {
    try {
        const messages = await getMessages();
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const deleteMessage = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(403)
        }
        const message = await deleteMessageById(id);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const updateSelectedMessage = async (req: express.Request, res: express.Response) => {
    try {
        const {id, data} = req.body;
        if(!id || !data){
            return res.status(403)
        }
        const message = await updateMessage(id, data);
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).send(error)
    }
}