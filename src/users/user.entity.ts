import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "User"})
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
