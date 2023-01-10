import { UserRepository } from '../src/app/features/user/repositories/user.repository';
import { ListUsersUsecase } from '../src/app/features/user/usecases/list-users.usecase';
import { DatabaseConnection } from '../src/main/database/typeorm.connection';
import { CacheConnection } from '../src/main/database/cache.connection';

describe("Testes iniciais", () => {

    //vai rodar antes de todos os testes do conjunto atual
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await CacheConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.connection.destroy();
        await CacheConnection.connection.quit();
    });

    test("deve retornar 2 quando somar 1 + 1", () => {
        const result = 1 + 1;
        expect(result).toBe(2);
    });

    test("um objeto usuario deve conter um atributo id se o usuario foi valido", () => {
        const user = {
            id: "123-abc",
            nome: "Maira",
            idade: 20,
        };

        expect(user).toHaveProperty("id");
        expect(user.idade).toBeGreaterThan(15);
    });

    test("deve testar um usecase só para cobertura", async () => {
        const sut = new ListUsersUsecase(new UserRepository());

        const result = await sut.execute();

        expect(result).toBeDefined();
        expect(result).not.toBeNull();
    });
}); 