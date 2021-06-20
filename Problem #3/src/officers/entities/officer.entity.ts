import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Officer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: string;

  @Column()
  salary: number;
}
