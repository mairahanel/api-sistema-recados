import { Request, Response } from "express";
import { usersList } from "../../../shared/data/usersList";
import { TaskRepository } from "../repositories/task.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { Task } from "../../../models/task.model";
import { serverError } from "../../../shared/util/response.helper";

export class TaskController {

    //feito
     public async create(req: Request, res: Response) {
        try {
            
            const { description, detail } = req.body;
            const { userId } = req.params;

            if(!description) {
                return res.status(400).send({
                    ok: false,
                    message: "Description not provided"
                })
            };

            if(!detail) {
                return res.status(400).send({
                    ok: false,
                    message: "Detail not provided"
                })
            };

            const task = new Task(description, detail, userId);

            const repository = new TaskRepository();
            const result = await repository.create(task);

            return res.status(201).send({
                ok: true,
                message: "Task succesfully created",
                data: result
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    }; 

    public async getAll(req: Request, res: Response) {
        try {
            
            const { userId } = req.params;

            const repository = new TaskRepository();
            const result = await repository.list(userId)

            if(!result) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            return res.status(200).send({
                ok: true,
                message: "Tasks succesfully listed",
                data: result
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    };

     public async delete(req: Request, res: Response) {
        try {
            const { userId, id } = req.params;

            const userRepository = new UserRepository();
            const userResult = await userRepository.get(userId);

            if(!userResult) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            const repository = new TaskRepository();
            const task = await repository.get(id);
            const result = await repository.delete(id)


             if(!task) {
                return res.status(404).send({
                    ok: false,
                    message: "Task not found"
                })
            };

            return res.status(200).send({
                ok: true,
                message: "Task succesfully deleted",
                data: result
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    }; 

     public async edit(req: Request, res: Response) {
        try {
            
            const { userId, id } = req.params;
            const { description, detail } = req.body;


            const userRepository = new UserRepository();
            const userResult = await userRepository.get(userId);

            if(!userResult) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            const repository = new TaskRepository();
            const result = await repository.get(id);

            if(!result) {
                return res.status(404).send({
                    ok: false,
                    message: 'Task not found'
                })
            };

            const resultUpdate = await repository.update(result, {
                description,
                detail
            });


            return res.status(201).send({
                ok: true,
                message: "Task succesfully updated",
                data: resultUpdate
            });

        } catch (error: any) {
            return serverError(res, error);
        }
    }; 

    //não feito
     public toFile(req: Request, res: Response) {
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
    }; 
}