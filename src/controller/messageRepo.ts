import { Message } from "../model/Message";

export const getMessages = ()=>Message.find()

export const getMessageByUserId = (id: string) => Message.find({user: id})

export const createMessage  = (data: any) => new Message(data).save().then((message) => message.toObject())

export const updateMessage = (id: string, data: any) => Message.findByIdAndUpdate(id, data)

export const deleteMessageById = (id: string) => Message.findByIdAndDelete(id)

