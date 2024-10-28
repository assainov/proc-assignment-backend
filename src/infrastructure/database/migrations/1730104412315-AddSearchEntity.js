export default class AddSearchEntity1730104412315 {
    name = 'AddSearchEntity1730104412315'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "search" ("id" SERIAL NOT NULL, "datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "payload" jsonb NOT NULL, "results" json NOT NULL, CONSTRAINT "PK_0bdd0dc9f37fc71a6050de7ae7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_SEARCH_DATETIME_PAYLOAD" ON "search" ("datetime", "payload") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_SEARCH_DATETIME_PAYLOAD"`);
        await queryRunner.query(`DROP TABLE "search"`);
    }
}
