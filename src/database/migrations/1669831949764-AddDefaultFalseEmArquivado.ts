import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultFalseEmArquivado1669831949764 implements MigrationInterface {
    name = 'AddDefaultFalseEmArquivado1669831949764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recado" ALTER COLUMN "arquivado" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recado" ALTER COLUMN "arquivado" DROP DEFAULT`);
    }

}
