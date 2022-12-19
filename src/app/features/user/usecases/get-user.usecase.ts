import { UserRepository } from "../repositories/user.repository";

export class GetUserUsecase {
    constructor(private repository: UserRepository) {}

    public async execute(id: string) {
        const result = await this.repository.get(id);

        if(!result) {
            return null
        }

        return result.toJson();
    }
}