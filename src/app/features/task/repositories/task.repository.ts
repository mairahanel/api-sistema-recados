import { Task } from "../../../models/task.model";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { TaskEntity } from "../../../shared/entities/task.entity";
import { UserEntity } from "../../../shared/entities/user.entity";

interface UpdateTaskDTO {
    description?: string,
    detail? : string
}

export class TaskRepository {
    private _repository = DatabaseConnection.connection.getRepository(TaskEntity);

    public async list(id: string) {
        return await this._repository.findBy({
            id_usuario: id
        });
    }

    public async get(id: string) {
        return this._repository.findOneBy({
            id
        })
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

    public async delete(id: string) {
        return await this._repository.delete(id)
    }

    public async update(task: TaskEntity, data: UpdateTaskDTO) {
        if(data.description) {
            task.descricao = data.description;
        }

        if(data.detail) {
            task.detalhamento = data.detail;
        }

        return await this._repository.save(task);
    }

}