import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1723446586877 implements MigrationInterface {
    name = 'Default1723446586877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" jsonb NOT NULL DEFAULT '["user"]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
