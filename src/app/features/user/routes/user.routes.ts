import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { emailExistsMiddleware } from "../../../shared/middlewares/email-exists.middleware";

export const userRoutes = Router();

userRoutes.get("/", (req: Request, res: Response) => new UserController().listAll(req, res));

userRoutes.get("/:id", (req: Request, res: Response) => new UserController().getById(req, res));

userRoutes.post("/", /*[emailExistsMiddleware],*/ (req: Request, res: Response) => new UserController().create(req, res));

userRoutes.post("/login", (req: Request, res: Response) => new UserController().login(req, res));

