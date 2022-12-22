import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TaskRepository } from "../repositories/task.repository";

export class ListTasksUsecase {
    constructor(private repository: TaskRepository, private cacheRepository: CacheRepository) {}

    public async execute(userId: string) {
        const cachedList = await this.cacheRepository.get(`tasks-${userId}`);
        if(cachedList) {
            return cachedList;
        }

        const result = await this.repository.list(userId);

        const resultJson = result.map(item => item.toJson());

        await this.cacheRepository.set(`tasks-${userId}`, resultJson);

        return resultJson;
    }
}