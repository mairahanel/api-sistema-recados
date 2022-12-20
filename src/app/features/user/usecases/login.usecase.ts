import { JwtHelper } from "../../../shared/util/jwt.helper";
import { UserRepository } from "../repositories/user.repository";

interface LoginDTO {
    email: string;
    password: string;
}

export class LoginUsecase {
    constructor(private repository: UserRepository) {}

    public async execute(data: LoginDTO) {
        const result = await this.repository.findByEmailPassword(
            data.email, 
            data.password
        );

        if(!result) {
            return null;
        }

        const user = result.toJson();

        const token = JwtHelper.createToken(user);

        return {
            ...user, 
            token
        }
    }
}