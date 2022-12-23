import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TaskRepository } from "../repositories/task.repository";

interface UpdateTaskDTO {
    id: string;
    description?: string;
    detail?: string
}

export class UpdateTaskUsecase {
    constructor(private repository: TaskRepository, private cacheRepository: CacheRepository) {}

    public async execute(data: UpdateTaskDTO) {
        const task = await this.repository.get(data.id);

        if(!task) {
            return null;
        }

        task.description = data.description ?? task.description;
        task.detail = data.detail ?? task.detail;

        const result = await this.repository.update(task);

        await this.cacheRepository.delete(`task-${task.id}`);
        await this.cacheRepository.delete(`tasks-${task.userId}`);

        return result;
    } 
}