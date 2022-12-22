import { Request, Response, Router } from "express";
import { checkLoginMiddleware } from "../../user/middlewares/check-login.middleware";
import { TaskController } from "../controllers/task.controller";
import { createTaskValidator } from "../validators/create-task.validator";

export const taskRoutes = Router();

taskRoutes.post("/:userId/tasks", [checkLoginMiddleware, createTaskValidator], (req: Request, res: Response) => new TaskController().create(req, res));

taskRoutes.get("/:userId/tasks", [checkLoginMiddleware], (req: Request, res: Response) => new TaskController().getAll(req, res));

taskRoutes.delete("/:userId/tasks/:id", [checkLoginMiddleware], (req: Request, res: Response) => new TaskController().delete(req, res));

//taskRoutes.put("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().edit(req, res));

taskRoutes.post("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().toFile(req, res));

taskRoutes.get("/:userId/tasks/archived", (req: Request, res: Response) => new TaskController().getAllArchived(req, res));

taskRoutes.post("/:userId/tasks/:id/archived", (req: Request, res: Response) => new TaskController().unfile(req, res));