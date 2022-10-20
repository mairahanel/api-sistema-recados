import { Request, Response, NextFunction } from "express";
import { usersList } from "../data/usersList";

export const emailExistsMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const { email } = req.body;

    if(usersList.some(user => user.email === email)) {
        return res.status(400).send({
            ok: false,
            message: "Email already registred on the system"
        })
    }

    next();
};