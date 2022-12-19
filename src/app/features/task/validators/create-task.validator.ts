import { NextFunction, Request, Response } from "express";
import { badRequestError } from "../../../shared/util/response.helper";

export const createTaskValidator = (req: Request, res: Response, next: NextFunction) => {
    
    const { description, detail } = req.body;

    if(!description) {
        return badRequestError(res, "Description not provided")
    };

    if(!detail) {
        return badRequestError(res, "Detail not provided")
    };

    next();
}