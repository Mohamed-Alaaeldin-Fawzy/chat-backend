import { User } from "../model/User";

export const getUsers = ()=>User.find()

export const getUserByEmail = (email: string) => User.findOne({email: email})

export const getUserById = (id: string) => User.findById(id)

//!!!!!!! NEED TO BE FIXED NOT WORKING (DONE)
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'auth.sessionToken': sessionToken})  

export const createUser  = (data: any) => new User(data).save().then((user) => user.toObject())

export const updateUser = (id: string, data: any) => User.findByIdAndUpdate(id, data)

export const deleteUserById = (id: string) => User.findByIdAndDelete(id)