import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TaskRepository } from "../repositories/task.repository";

export class DeleteTaskUsecase {
    constructor(private repository: TaskRepository, private cacheRepository: CacheRepository) {}

    public async execute(id: string) {
        const result = await this.repository.delete(id);

        if(!result) {
            return null;
        }

        await this.cacheRepository.delete(`task-${result.id}`);
        await this.cacheRepository.delete(`tasks-${result.userId}`);

        return result.toJson();
    }
}