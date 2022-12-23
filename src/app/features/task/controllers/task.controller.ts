import { Request, Response } from "express";
import { usersList } from "../../../shared/data/usersList";
import { TaskRepository } from "../repositories/task.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { notFoundError, serverError, success, successCreate } from "../../../shared/util/response.helper";
import { ListTasksUsecase } from "../usecases/list-tasks.usecase";
import { CreateTaskUsecase } from "../usecases/create-task.usecase";
import { GetUserUsecase } from "../../user/usecases/get-user.usecase";
import { DeleteTaskUsecase } from "../usecases/delete-task.usecase";
import { GetTaskUsecase } from "../usecases/get-task.usecase";
import { UpdateTaskUsecase } from "../usecases/update-task.usecase";
import { CacheRepository } from "../../../shared/repositories/cache.repository";

export class TaskController {

    public async create(req: Request, res: Response) {
        try {
            const { description, detail } = req.body;
            const { userId } = req.params;

            const usecase = new CreateTaskUsecase(new TaskRepository, new CacheRepository);
            const result = await usecase.execute({
                description, 
                detail,
                userId, 
            }); 

            return successCreate(res, result, "Task successfully created");

        } catch (error: any) {
            return serverError(res, error);
        }
    }; 

    public async list(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const usecase = new ListTasksUsecase(new TaskRepository(), new CacheRepository());
            const result = await usecase.execute(userId);

            if(!result) {
                return notFoundError(res, "User not found")
            };

            return success(res, result, "Tasks successfully listed");

        } catch (error: any) {
            return serverError(res, error);
        }
    };

    public async get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usecase = new GetTaskUsecase(new TaskRepository, new CacheRepository);
            const result = await usecase.execute(id);

            if(!result) {
                return notFoundError(res, "Task not found");
            }

            return success(res, result, "Task successfully obtained");

        } catch (error: any) {
            return serverError(res, error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usecase = new DeleteTaskUsecase(new TaskRepository, new CacheRepository);
            const result = await usecase.execute(id); 

            if(result === null) {
                return notFoundError(res, "Task not found");
            }

            return success(res, result, "Task successfully deleted");

        } catch (error: any) {
            return serverError(res, error);
        }
    }; 

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { description, detail } = req.body;

            const usecase = new UpdateTaskUsecase(new TaskRepository, new CacheRepository);
            const result = await usecase.execute({
                id,
                description,
                detail
            });

            if(result === null) {
                return notFoundError(res, "Task not found");
            }

            return successCreate(res, result, "Task successfully updated");

        } catch (error: any) {
            return serverError(res, error);
        } 
    };

    //não feito
/*     public toFile(req: Request, res: Response) {
        try {
            
            const { userId, id } = req.params;
            
            let user = usersList.find((user) => user.id === userId);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            let userTask = user.tasks.find((task) => task.id === id);
            let taskIndex = user.tasks.findIndex((task) => task.id === id);

            if(!userTask) {
                return res.status(404).send({
                    ok: false,
                    message: "Task not found"
                })
            };

            const task = userTask;

            user.archivedTasks.push(task);

            user.tasks.splice(taskIndex, 1);

            return res.status(200).send({
                ok: true,
                message: "Task succesfully archived",
                data: user.tasks
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    }; 

    public getAllArchived(req: Request, res: Response) {
        try {
            
            const { userId} = req.params;

            let user = usersList.find((user) => user.id === userId);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            return res.status(200).send({
                ok: true,
                message: "Tasks succesfully listed",
                data: user.archivedTasks
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    }; 

    public unfile(req: Request, res: Response) {
        try {
            
            const { userId, id } = req.params;

            let user = usersList.find((user) => user.id === userId);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            let userTask = user.archivedTasks.find((task) => task.id === id);

            if(!userTask) {
                return res.status(404).send({
                    ok: false,
                    message: "Task not found"
                })
            };

            const task = userTask;

            user.tasks.push(task);

            let taskIndex = user.archivedTasks.findIndex((task) => task.id === id);

            user.archivedTasks.splice(taskIndex, 1);

            return res.status(200).send({
                ok: true,
                message: "Task succesfully unarchived",
                data: user.archivedTasks
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    }; */ 
}