import { Task } from "../../../models/task.model";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { TaskEntity } from "../../../shared/entities/task.entity";

interface UpdateTaskDTO {
    id: string;
    description?: string;
    detail? : string
}

export class TaskRepository {
    private _repository = DatabaseConnection.connection.getRepository(TaskEntity);

    public async list(id: string) {
        const result = await this._repository.findBy({
            id_usuario: id
        });

        const tasks = result.map((item) => {
            return this.mapEntityToModel(item)
        });

        return tasks;
    }

    public async get(id: string) {
        const result = await this._repository.findOneBy({
            id
        });

        if(!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    public async create(task: Task) {
        const taskEntity = this._repository.create({
            id: task.id,
            descricao: task.description,
            detalhamento: task.detail,
            id_usuario: task.userId,
        });

        const result = await this._repository.save(taskEntity);

        return this.mapEntityToModel(result);
    }

    public async delete(id: string) {
       const getResult = await this._repository.findOneBy({
            id
        });

        if(!getResult) {
            return null;
        } 

        const result = await this._repository.delete(id);
        
        return this.mapEntityToModel(getResult);
    }

/*     public async update(task: TaskEntity, data: UpdateTaskDTO) {
        if(data.description) {
            task.descricao = data.description;
        }

        if(data.detail) {
            task.detalhamento = data.detail;
        }

        const result = await this._repository.save(task);

        return this.mapEntityToModel(result);
    }  */

/*     public async update(task: UpdateTaskDTO) {
        const result = await this._repository.update(
          {
            id: task.id,
          },
          {
            description: task.description,
            detail: task.detail,
          }
        );
    
        return result.affected ?? 0;
      } */


    private mapEntityToModel(entity: TaskEntity) {
        return Task.create(
            entity.id,
            entity.descricao,
            entity.detalhamento,
            entity.id_usuario,
        );
    }

}