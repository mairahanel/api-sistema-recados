import { NextFunction, Request, Response } from "express";
import { JwtHelper } from "../../../shared/util/jwt.helper";
import { unauthorizedError } from "../../../shared/util/response.helper";

export const checkLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body;

        if(!token) {
            return unauthorizedError(res, "Token not provided");
        }
    
        JwtHelper.verifyToken(token);

        next();
        
    } catch (error:any) {
        return unauthorizedError(res, "Invalid token");
    }
}