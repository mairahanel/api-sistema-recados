import { Request, Response } from "express";
import { usersList } from "../data/usersList";
import { User } from "../models/user";

export class UserController {

    public create(req: Request, res: Response) {
        try {
            
            const {email, password, verifyPassword} = req.body;

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
    };

    public login(req: Request, res: Response) {
        try {
            
            const { email, password } = req.body;

            if(!email) {
                return res.status(400).send({
                    ok: false,
                    message: "Email not provided"
                })
            };

            if(!password) {
                return res.status(400).send({
                    ok: false,
                    message: "Password not provided"
                })
            };

            let checkUser = usersList.find((user) => user.email === email);

            if(!checkUser) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            if(checkUser?.password !== password) {
                return res.status(400).send({
                    ok: false,
                    message: "Login error"
                })
            };

            return res.status(200).send({
                ok: true,
                message: "Login succesfully done",
                data: checkUser?.id
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    };
}