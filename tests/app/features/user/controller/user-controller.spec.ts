import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { UserController} from "../../../../../src/app/features/user/controllers/user.controller";
import request from "supertest";
import { createServer } from "../../../../../src/main/config/express.config";
import { CreateUserUsecase } from "../../../../../src/app/features/user/usecases/create-user.usecase";
import { User } from "../../../../../src/app/models/user.model";

describe("User controller tests", () => {

    beforeAll(async () => {
        await DatabaseConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.connection.destroy();
    });

    const makeSut = () => {
        const sut = createServer();

        return sut;
    }

    test("deve retornar HTTP 400 quando o email não for informado", async () => {

        const app = makeSut();

        const result = await request(app).post("/users").send({});

        expect(result.statusCode).toBe(400);
    });

    test("deve retornar HTTP 201 quando o user for criado com sucesso", async () => {

        const app = makeSut();

        const user = {
            email: "teste@test.com",
            password: "1234",
            verifyPassword: "1234"
        };

        jest.spyOn(CreateUserUsecase.prototype, "execute").mockResolvedValue(
            new User(user.email, user.password, user.verifyPassword).toJson()
        );

        const result = await request(app).post("/users").send(user);

        expect(result.statusCode).toBe(201);
        expect(result.body).not.toBeNull();
        expect(result).toHaveProperty("body.ok", true);
        expect(result).toHaveProperty("body.message", "User succesfully created");
    });

    test("deve retornar HTTP 500 quando o usecase gerar exceção", async () => {

        const app = makeSut();

        const user = {
            email: "teste@test.com",
            password: "1234",
            verifyPassword: "1234"
        };

        jest.spyOn(CreateUserUsecase.prototype, "execute").mockImplementation(() => {
            throw new Error("Erro no teste unitário")
        });

        const result = await request(app).post("/users").send(user);

        expect(result.statusCode).toBe(500);
        expect(result.body).not.toBeNull();
        expect(result).toHaveProperty("body.ok", false);
        expect(result).toHaveProperty("body.message", new Error("Erro no teste unitário").toString());

    });

    // not working
    test("deve retornar HTTP 200 quando o usuario existir", async () => {

        const app = makeSut();

        const user = {
            email: "teste@test.com",
            password: "1234",
            v_password: "1234",
            id: "abc1234"
        };

        jest.spyOn(CreateUserUsecase.prototype, "execute").mockResolvedValue(
            new User(user.email, user.password, user.v_password).toJson()
        );

        const result = await request(app).get(`/users/${user.id}`).send();  

        expect(result.statusCode).toBe(200);
        expect(result).toHaveProperty("body.ok", true);
        expect(result).toHaveProperty("body.message", "User succesfully obtained");
    });
})