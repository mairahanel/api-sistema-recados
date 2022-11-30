import { MigrationInterface, QueryRunner } from "typeorm";

export class CriacaoDeTabelasUsuarioERecado1669830780652 implements MigrationInterface {
    name = 'CriacaoDeTabelasUsuarioERecado1669830780652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recado" ("id" character varying NOT NULL, "descricao" character varying NOT NULL, "detalhamento" character varying NOT NULL, "arquivado" boolean NOT NULL, "dthr_registro" TIMESTAMP NOT NULL DEFAULT now(), "dthr_atualizacao" TIMESTAMP DEFAULT now(), "id_usuario" character varying NOT NULL, CONSTRAINT "PK_f60545f7289a677f98f820c0c33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" character varying NOT NULL, "email" character varying(60) NOT NULL, "senha" character varying(20) NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recado" ADD CONSTRAINT "FK_c9a770b975c1a5fbdbfd20e0edb" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recado" DROP CONSTRAINT "FK_c9a770b975c1a5fbdbfd20e0edb"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "recado"`);
    }

}
