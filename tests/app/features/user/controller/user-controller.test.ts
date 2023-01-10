import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { createServer } from "../../../../../src/main/config/express.config";
import request from "supertest";
import { UserEntity } from "../../../../../src/app/shared/entities/user.entity";

describe("Get user by id - integration test", () => {

    beforeAll(async () => {
        await DatabaseConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.connection.destroy();
    });

    const makeSut = () => {
        const sut = createServer();

        return sut;
    };

    beforeEach(async () => {
        const userRepository = DatabaseConnection.connection.getRepository(UserEntity);
        await userRepository.delete({
            id: "abc"
        });
    })

    test("deve retornar 404 se o user não existir", async () => {

        const app = makeSut();

        const result = await request(app).get("/users/abc").send();

        expect(result).not.toBeNull();
        expect(result.statusCode).toEqual(404);
        expect(result).toHaveProperty("body.ok", false);
        expect(result).toHaveProperty("body.message", "User not found");
    });
})