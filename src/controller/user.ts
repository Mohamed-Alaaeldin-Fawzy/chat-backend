import express from "express";
import {getUserByEmail,createUser,getUsers,deleteUserById,updateUser} from "./userRepo";
import {random,auth} from "../helpers/auth";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403);
        }

        const user = await getUserByEmail(email).select("+auth.password + auth.salt");
        if (!user) {
            return res.status(403).send("User not found");
        }

        const expectedHash = auth(user.auth.salt, password);

        if (expectedHash !== user.auth.password) {
            return res.status(403).send("Wrong password");
        }
        const salt = random()
        user.auth.sessionToken = auth(salt, user._id.toString());
        await user.save();
        res.cookie(`auth-token`, user.auth.sessionToken, { domain: "localhost",path:"/" });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const register = async (req : express.Request, res : express.Response) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(403)
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(403).send("User already exist")
        }

        const salt = random();

        const user = await createUser({
            name,
            email,
            auth:{
                password: auth(salt, password),
                salt
            }
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getAllUsers = async (req : express.Request, res : express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const deleteUser = async (req : express.Request, res : express.Response) => {
    try {
        const {id} = req.body;
        if(!id){
            return res.status(403)
        }
        const user = await deleteUserById(id);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export const updateCurrentUser = async (req : express.Request, res : express.Response) => {
    try {
        const {id, data} = req.body;
        if(!id || !data){
            return res.status(403)
        }
        const user = await updateUser(id, {data});
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}