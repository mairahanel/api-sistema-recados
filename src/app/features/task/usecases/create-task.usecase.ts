import { Task } from "../../../models/task.model";
import { TaskRepository } from "../repositories/task.repository";

interface CreateTaskDTO {
    userId: string;
    description: string;
    detail: string
}

export class CreateTaskUsecase {
    constructor(private repository: TaskRepository) {}

    public async execute(data: CreateTaskDTO) {
        const task = new Task(
            data.description,
            data.detail,
            data.userId
        );

        const result = await this.repository.create(task);

        return result.toJson();
    }
}