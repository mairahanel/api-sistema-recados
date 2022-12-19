import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColunaVerificacaoDeSenha1671423536737 implements MigrationInterface {
    name = 'AddColunaVerificacaoDeSenha1671423536737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "v_senha" character varying(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "V_senha"`);
    }

}
