import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column({unique:true})
  email: string;
  @Column()
  password: string;
  @Column()
  country: string;
}
