import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { serverError, successCreate, success, notFoundError } from "../../../shared/util/response.helper";
import { ListUsersUsecase } from "../usecases/list-users.usecase";
import { CreateUserUsecase } from "../usecases/create-user.usecase";
import { GetUserUsecase } from "../usecases/get-user.usecase";

export class UserController {

    //feito
    public async listAll(req: Request, res: Response) {
        try {
            const usecase = new ListUsersUsecase(new UserRepository);
            const result = await usecase.execute();

            return success(res, result, "Users succesfully listed");

        } catch (error: any) {
            return serverError(res, error);
        }
    };

    //feito
    public async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usecase = new GetUserUsecase(new UserRepository);
            const result = await usecase.execute(id);

            if(!result) {
                return notFoundError(res, "User not found");
            }

            return success(res, result, "User succesfully obtained");

        } catch (error: any) {
            return serverError(res, error);
        }
    };

    //feito
    public async create(req: Request, res: Response) {
        try {
            
            const {email, password, verifyPassword} = req.body;

            const repository = new UserRepository();
            const usecase = new CreateUserUsecase(repository);

            const result = await usecase.execute({
                email,
                senha: password,
                v_senha: verifyPassword
            });

            return successCreate(res, result, "User succesfully created");

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