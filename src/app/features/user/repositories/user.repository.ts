import { User } from "../../../models/user.model";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { UserEntity } from "../../../shared/entities/user.entity";

export class UserRepository {

    private _repository = DatabaseConnection.connection.getRepository(UserEntity);

    public async list() {
        const result = await this._repository.find();

        const users = result.map((item) => {
            return this.mapEntityToModel(item)
        });

        return users;
    }

    public async get(id: string) {
        const result = await this._repository.findOneBy({
            id
        });

        if(!result) {
            return null
        }

        return this.mapEntityToModel(result);

    }

    public async getEmail(email: string) {
        return await this._repository.findBy({
            email
        })
    }

/*     public async getUsuario(usuario: UserEntity) {
        return await this._repository.findBy({
            senha: usuario.senha
        })
    } */

    public async create(user: User) {
        const userEntity = this._repository.create({
            id: user.id,
            email: user.email,
            senha: user.password,
            v_senha: user.vPassword
        });

        const result = await this._repository.save(userEntity);

        return this.mapEntityToModel(result);
    }

    public async findByEmailPassword(email: string, senha: string) {
        const result = await this._repository.findOneBy({
            email, senha
        });

        if(!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    
    private mapEntityToModel(entity: UserEntity) {
        return User.create(
            entity.id,
            entity.email,
            entity.senha,
            entity.v_senha,
        );
    }
}