import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOfficersTable1624188938317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE TABLE officers`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE officers`);
  }
}
