import { Request, Response, Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { UserController } from "../controllers/user.controller";
import { emailExistsMiddleware } from "../middlewares/email-exists.middleware";

export const userRoutes = Router();

// Rotas de usuário
userRoutes.get("/", (req: Request, res: Response) => new UserController().listAll(req, res));

userRoutes.get("/:id", (req: Request, res: Response) => new UserController().getById(req, res));

userRoutes.post("/", /*[emailExistsMiddleware],*/ (req: Request, res: Response) => new UserController().create(req, res));

userRoutes.post("/login", (req: Request, res: Response) => new UserController().login(req, res));

// Rotas de tasks
userRoutes.post("/:userId/tasks", (req: Request, res: Response) => new TaskController().create(req, res));

userRoutes.get("/:userId/tasks", (req: Request, res: Response) => new TaskController().getAll(req, res));

userRoutes.delete("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().delete(req, res));

userRoutes.put("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().edit(req, res));

userRoutes.post("/:userId/tasks/:id", (req: Request, res: Response) => new TaskController().toFile(req, res));

userRoutes.get("/:userId/tasks/archived", (req: Request, res: Response) => new TaskController().getAllArchived(req, res));

userRoutes.post("/:userId/tasks/:id/archived", (req: Request, res: Response) => new TaskController().unfile(req, res));
