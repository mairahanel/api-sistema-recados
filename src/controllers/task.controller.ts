import { Request, Response } from "express";
import { usersList } from "../data/usersList";
import { Task } from "../models/task";

export class TaskController {

    public create(req: Request, res: Response) {
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

            const task = new Task(description, detail);

            let userTask = usersList.find((user) => user.id === userId);

            if(!userTask) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            userTask.tasks.push(task);

            return res.status(201).send({
                ok: true,
                message: "Task succesfully created",
                data: userTask.tasks
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    };

    public delete(req: Request, res: Response) {
        try {
            const { userId, id } = req.params;

            let user = usersList.find((user) => user.id === userId);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            let taskIndex = user.tasks.findIndex((task) => task.id === id);

            if(taskIndex < 0) {
                return res.status(404).send({
                    ok: false,
                    message: "Task not found"
                })
            };

            user.tasks.splice(taskIndex, 1);

            return res.status(200).send({
                ok: true,
                message: "Task succesfully deleted",
                data: user.tasks
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    };

    public edit(req: Request, res: Response) {
        try {
            
            const { userId, id } = req.params;
            const { description, detail } = req.body;

            let user = usersList.find((user) => user.id === userId);

            if(!user) {
                return res.status(404).send({
                    ok: false,
                    message: "User not found"
                })
            };

            let userTask = user.tasks.find((task) => task.id === id);

            if(!userTask) {
                return res.status(404).send({
                    ok: false,
                    message: "Task not found"
                })
            };

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

            userTask.description = description;
            userTask.detail = detail;

            return res.status(201).send({
                ok: true,
                message: "Task succesfully edited",
                data: user.tasks
            });

        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString()
            })
        }
    };
}