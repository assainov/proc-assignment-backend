export default class AddUsersEntity1730129253617 {
    name = 'AddUsersEntity1730129253617'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("email" character varying NOT NULL, "firstname" character varying NOT NULL, "surname" character varying NOT NULL, "hashedPassword" character varying NOT NULL, CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY ("email"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
