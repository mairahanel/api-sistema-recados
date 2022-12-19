import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../features/user/repositories/user.repository";

export const  emailExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body;

    const repository = new UserRepository();

    const exists = await repository.getEmail(email);

    if(exists) {
        return res.status(400).send({
            ok: false,
            message: "Email already registred on the system"
        })
    };

    next();
};