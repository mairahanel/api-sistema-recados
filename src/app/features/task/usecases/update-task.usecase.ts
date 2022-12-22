import { Task } from "../../../models/task.model";
import { TaskEntity } from "../../../shared/entities/task.entity";
import { TaskRepository } from "../repositories/task.repository";

interface UpdateTaskDTO {
    id: string;
    description?: string;
    detail?: string
}

export class UpdateTaskUsecase {
    constructor(private repository: TaskRepository) {}

    public async execute(data: UpdateTaskDTO) {
        const task = await this.repository.get(data.id);

        if(!task) {
            return null;
        }

        task.description = data.description ?? task.description;
        task.detail = data.detail ?? task.detail;

        const result = await this.repository.update(task);

        return result;
    } 
}