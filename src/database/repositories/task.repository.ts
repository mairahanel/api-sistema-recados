import { DatabaseConnection } from "../config/connection";
import { TaskEntity } from "../entities/task.entity";

export class TaskRepository {
    private _repository = DatabaseConnection.connection.getRepository(TaskEntity);

    public async list(id: string) {
        return await this._repository.findOneBy({
            id
        });
    }

}