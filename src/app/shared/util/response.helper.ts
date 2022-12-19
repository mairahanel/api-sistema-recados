import { Response } from "express";

export const serverError = (res: Response, error: any) => {
    return res.status(500).send({
        ok: false,
        message: error.toString()
    });
}

export const success = (res: Response, data?: any, message?: string) => {
    return res.status(200).send({
        ok: true, 
        message,
        data
    });
}

export const successCreate = (res: Response, data?: any, message?: string) => {
    return res.status(201).send({
        ok: true, 
        message,
        data
    });
}