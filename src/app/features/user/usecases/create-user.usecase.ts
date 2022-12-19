import { User } from "../../../models/user.model";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserDTO {
    email: string;
    senha: string;
    v_senha: string
}

export class CreateUserUsecase {
    constructor(private repository: UserRepository) {}

    public async execute(data: CreateUserDTO) {
        const user = new User(
            data.email, 
            data.senha, 
            data.v_senha
        );

        const result = await this.repository.create(user);

        return result.toJson();
    }
}