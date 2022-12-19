import { Request, Response, Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const taskRoutes = Router();

taskRoutes.post("/:userId/tasks", (req: Request, res: Response) => new TaskController().create(req, res));

taskRoutes.get("/:userId/tasks", (req: Request, res: Response) => new TaskController().getAll(req, res));

taskRoutes.delete("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().delete(req, res));

taskRoutes.put("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().edit(req, res));

taskRoutes.post("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().toFile(req, res));

taskRoutes.get("/:userId/tasks/archived", (req: Request, res: Response) => new TaskController().getAllArchived(req, res));

taskRoutes.post("/:userId/tasks/:id/archived", (req: Request, res: Response) => new TaskController().unfile(req, res));