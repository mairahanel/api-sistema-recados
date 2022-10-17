import { Request, Response } from "express";
import { usersList } from "../data/usersList";
import { User } from "../models/user";

export class UserController {

    public create(req: Request, res: Response) {
        try {
            
            const {email, password, verifyPassword} = req.body;

            if(usersList.some(user => user.email === email)) {
                return res.status(400).send({
                    ok: false,
                    message: "Email already registred on the system"
                })
            };

            if(!email) {
                return res.status(400).send({
                    ok: false,
                    message: "Email not provided"
                })
            };

            if(!password || !verifyPassword) {
                return res.status(400).send({
                    ok: false,
                    message: "Password not provided"
                })
            };

            if(verifyPassword !== password) {
                return res.status(400).send({
                    ok: false,
                    message: "Password provided incorrectly"
                })
            };

            const user = new User(email, password, verifyPassword);

            usersList.push(user);

            return res.status(201).send({
                ok: true,
                message: "User succesfully created",
                data: usersList
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    }
}