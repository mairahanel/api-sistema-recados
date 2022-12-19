import { TaskRepository } from "../repositories/task.repository";

export class DeleteTaskUsecase {
    constructor(private repository: TaskRepository) {}

    public async execute(id: string) {
        const result = await this.repository.delete(id);

        if(!result) {
            return null;
        }

        return result.toJson();
    }
}