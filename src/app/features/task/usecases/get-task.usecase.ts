import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TaskRepository } from "../repositories/task.repository";

export class GetTaskUsecase {
    constructor(private repository: TaskRepository, private cacheRepository: CacheRepository) {}

    public async execute(id: string) {
        const taskCache = await this.cacheRepository.get(`task-${id}`);
        if(taskCache) {
            return taskCache;
        }

        const result = await this.repository.get(id);

        if(!result) {
            return null;
        }

        const resultJson = result.toJson();

        await this.cacheRepository.set(`task-${id}`, resultJson);

        return resultJson;
    }
}