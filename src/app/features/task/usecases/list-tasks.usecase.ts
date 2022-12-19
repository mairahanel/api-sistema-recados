import { TaskRepository } from "../repositories/task.repository";

export class ListTasksUsecase {
    constructor(private repository: TaskRepository) {}

    public async execute(userId: string) {
        const result = await this.repository.list(userId);

        return result.map(item => item.toJson());
    }
}