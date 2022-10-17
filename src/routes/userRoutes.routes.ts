import { Request, Response, Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { UserController } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.post("/", (req: Request, res: Response) => new UserController().create(req, res));

userRoutes.post("/:userId/tasks", (req: Request, res: Response) => new TaskController().create(req, res));

userRoutes.delete("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().delete(req, res));

userRoutes.put("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().edit(req, res));