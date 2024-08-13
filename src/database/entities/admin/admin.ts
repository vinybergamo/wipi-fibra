import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeUpdate, BeforeInsert } from "typeorm";
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
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
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeInsert()
    setCreatedAt() {
        this.created_at = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updated_at = new Date();
    }
}