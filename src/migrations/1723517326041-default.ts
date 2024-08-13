import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1723517326041 implements MigrationInterface {
    name = 'Default1723517326041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_70e6c0143fef2853615da465322"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "PK_f3f2f25a099d24e12545b70b022"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "REL_70e6c0143fef2853615da46532"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "bookIssueId"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "bookIssueId" uuid`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "UQ_70e6c0143fef2853615da465322" UNIQUE ("bookIssueId")`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "PK_f0a21dbf9e29955450a5c2bd4cc"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "PK_f0a21dbf9e29955450a5c2bd4cc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "REL_071b6b35734fc3f3b253cc8e30"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD "bookId" uuid`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "UQ_071b6b35734fc3f3b253cc8e303" UNIQUE ("bookId")`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_70e6c0143fef2853615da465322" FOREIGN KEY ("bookIssueId") REFERENCES "bookIssues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_70e6c0143fef2853615da465322"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "UQ_071b6b35734fc3f3b253cc8e303"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD "bookId" integer`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "REL_071b6b35734fc3f3b253cc8e30" UNIQUE ("bookId")`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP CONSTRAINT "PK_f0a21dbf9e29955450a5c2bd4cc"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "PK_f0a21dbf9e29955450a5c2bd4cc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "UQ_70e6c0143fef2853615da465322"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "bookIssueId"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "bookIssueId" integer`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "REL_70e6c0143fef2853615da46532" UNIQUE ("bookIssueId")`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "PK_f3f2f25a099d24e12545b70b022"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_70e6c0143fef2853615da465322" FOREIGN KEY ("bookIssueId") REFERENCES "bookIssues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookIssues" ADD CONSTRAINT "FK_071b6b35734fc3f3b253cc8e303" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
