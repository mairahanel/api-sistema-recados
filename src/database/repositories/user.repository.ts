import { User } from "../../models/user";
import { DatabaseConnection } from "../config/connection";
import { UserEntity } from "../entities/user.entity";

export class UserRepository {

    private _repository = DatabaseConnection.connection.getRepository(UserEntity);

    public async list() {
        return await this._repository.find();
    }

    public async get(id: string) {
        return await this._repository.findOneBy({
            id
        })
    }

    public async getEmail(email: string) {
        return await this._repository.findBy({
            email
        })
    }

    public async create(user: User) {
        const userEntity = this._repository.create({
            id: user.id,
            email: user.email,
            senha: user.password
        });

        return await this._repository.save(userEntity);
    }
}