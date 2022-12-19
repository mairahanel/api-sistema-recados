import { Request, Response } from "express";
import { usersList } from "../../../shared/data/usersList";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../../../models/user.model";
import { serverError, sucess } from "../../../shared/util/response.helper";

export class UserController {

    public async listAll(req: Request, res: Response) {
        try {

            const repository = new UserRepository();
            const result = await repository.list();

            return sucess(res, result, "Users succesfully listed");

        } catch (error: any) {
            return serverError(res, error);
        }
    };

    public async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const repository = new UserRepository();
            const result = await repository.get(id);

            if(!result) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            return res.status(200).send({
                ok: true,
                message: "User succesfully obtained",
                data: result
            })

        } catch (error: any) {
            return serverError(res, error);
        }
    };

    public async create(req: Request, res: Response) {
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

            const repository = new UserRepository();
            const result = await repository.create(user);

            return res.status(201).send({
                ok: true,
                message: "User succesfully created",
                data: result
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    };

    // não feito

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

            //let checkUser = usersList.find((user) => user.email === email);

            const repository = new UserRepository();
            const result = repository.getEmail(email);
            //const resultUser = repository.getUsuario(password);

            if(!result) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

/*              if(resultUser !== password) {
                return res.status(400).send({
                    ok: false,
                    message: "Login error"
                })
            };  */

            return res.status(200).send({
                ok: true,
                message: "Login succesfully done",
                data: result
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    };
}