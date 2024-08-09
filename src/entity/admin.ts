import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Entity()
export class Admins {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string

    @Column()
    _password: string

    set password(pass: string) {
        const salt = genSaltSync();
        const hash = hashSync(pass, salt);
        this._password = hash;
    }

    public verifyPassword(password: string) {
        return compareSync(password, this._password);
    }
}