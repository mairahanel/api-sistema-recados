import { TaskRepository } from "../repositories/task.repository";

export class GetTaskUsecase {
    constructor(private repository: TaskRepository) {}

    public async execute(id: string) {
        const result = await this.repository.get(id);

        if(!result) {
            return null;
        }

        return result.toJson();
    }
}