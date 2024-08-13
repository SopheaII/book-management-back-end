import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1723539178911 implements MigrationInterface {
    name = 'Default1723539178911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "UQ_071b6b35734fc3f3b253cc8e303"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "UQ_071b6b35734fc3f3b253cc8e303" UNIQUE ("bookId")`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
