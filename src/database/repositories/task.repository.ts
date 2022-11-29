import { Task } from "../../models/task";
import { DatabaseConnection } from "../config/connection";
import { TaskEntity } from "../entities/task.entity";

export class TaskRepository {
    private _repository = DatabaseConnection.connection.getRepository(TaskEntity);

    public async list(id: string) {
        return await this._repository.findBy({
            id_usuario: id
        });
    }

    public async create(task: Task) {
        const taskEntity = this._repository.create({
            id: task.id,
            descricao: task.description,
            detalhamento: task.detail,
            id_usuario: task.userId
        });

        return await this._repository.save(taskEntity);
    }

}