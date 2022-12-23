import { Task } from "../../../models/task.model";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TaskRepository } from "../repositories/task.repository";

interface CreateTaskDTO {
    userId: string;
    description: string;
    detail: string
}

export class CreateTaskUsecase {
    constructor(private repository: TaskRepository, private cacheRepository: CacheRepository) {}

    public async execute(data: CreateTaskDTO) {
        const task = new Task(
            data.description,
            data.detail,
            data.userId
        );

        const result = await this.repository.create(task);

        await this.cacheRepository.delete(`task-${result.id}`);
        await this.cacheRepository.delete(`tasks-${result.userId}`);

        return result.toJson();
    }
}