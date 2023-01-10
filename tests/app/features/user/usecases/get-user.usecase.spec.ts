import { CacheConnection } from "../../../../../src/main/database/cache.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { GetUserUsecase } from '../../../../../src/app/features/user/usecases/get-user.usecase';
import { UserRepository } from "../../../../../src/app/features/user/repositories/user.repository";
import { User } from "../../../../../src/app/models/user.model";

describe("Get user usecase tests", () => {

    beforeAll(async () => {
        await DatabaseConnection.connect();
        await CacheConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.connection.destroy();
        await CacheConnection.connection.quit();
    });

    const makeSut = () => {
        const sut = new GetUserUsecase(new UserRepository());

        return sut;
    };

    test("deve retornar um usuario se o id existir", async () => {
        const sut = makeSut();

        const user = new User("teste@gmail.com", "1234", "1234");

        jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(user);

        const result = await sut.execute(user.id);

        expect(result).not.toBeNull();
        expect(result?.id).toBe(user.id);
    });

    test("deve retornar null quando o usuario não existe", async () => {
        const sut = makeSut();

        jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null); 

        const result = await sut.execute('qualquer-id');

        expect(result).toBeNull();
    });
})