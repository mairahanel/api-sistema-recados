import { Request, Response, Router } from "express";
import { checkLoginMiddleware } from "../../user/middlewares/check-login.middleware";
import { TaskController } from "../controllers/task.controller";
import { createTaskValidator } from "../validators/create-task.validator";

export const taskRoutes = Router();

taskRoutes.post("/:userId/tasks", [checkLoginMiddleware, createTaskValidator], (req: Request, res: Response) => new TaskController().create(req, res));

taskRoutes.get("/:userId/tasks", [checkLoginMiddleware], (req: Request, res: Response) => new TaskController().list(req, res));

taskRoutes.get("/:id/task", [checkLoginMiddleware], (req: Request, res: Response) => new TaskController().get(req, res));

taskRoutes.put("/:id/tasks", [checkLoginMiddleware], (req: Request, res: Response) => new TaskController().update(req, res));

taskRoutes.delete("/:userId/tasks/:id", [checkLoginMiddleware], (req: Request, res: Response) => new TaskController().delete(req, res));

taskRoutes.post("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().toFile(req, res));

taskRoutes.get("/:userId/tasks/archived", (req: Request, res: Response) => new TaskController().getAllArchived(req, res));

taskRoutes.post("/:userId/tasks/:id/archived", (req: Request, res: Response) => new TaskController().unfile(req, res));