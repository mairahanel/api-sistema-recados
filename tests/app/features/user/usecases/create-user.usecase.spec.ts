import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { CreateUserUsecase } from "../../../../../src/app/features/user/usecases/create-user.usecase";
import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { User } from "../../../../../src/app/models/user.model";

describe("Create user usecase unit tests", () => {

    beforeAll(async () => {
        await DatabaseConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.connection.destroy();
    });

    const makeSut = () => {
        const sut = new CreateUserUsecase(new UserRepository());

        return sut;
    };

    test("deve retornar os dados do usuario ao executar o create user", async () => {
        const sut = makeSut();

        const user = {
            email: "teste@test.com",
            senha: "123",
            v_senha: "123"
        }

        jest.spyOn(UserRepository.prototype, "create").mockResolvedValue(
            new User(user.email, user.senha, user.v_senha)
        );

        const result = await sut.execute(user);

        expect(result).not.toBeNull();
        expect(result).toBeDefined();
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("email");

        expect(result.email).toBe(user.email);
    });

})