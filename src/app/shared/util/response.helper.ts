import { Response } from "express";

export const serverError = (res: Response, error: any) => {
    return res.status(500).send({
        ok: false,
        message: error.toString()
    });
}

export const notFoundError = (res: Response, message?: string) => {
    return res.status(404).send({
        ok: false,
        message
    });
}

export const badRequestError = (res: Response, message?: string) => {
    return res.status(400).send({
        ok: false,
        message
    });
}

export const unauthorizedError = (res: Response, message?: string) => {
    return res.status(401).send({
        ok: false,
        message
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