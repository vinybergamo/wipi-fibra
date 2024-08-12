import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({ name: 'consult' })
export class Consult extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cep: string;

    @Column()
    founded: boolean;

    @Column({ nullable: true })
    viability: string

    @Column({ nullable: true })
    address: string

    @Column({ default: false })
    submitted: boolean

    @Column({ nullable: true, type: 'jsonb' })
    biBody: object

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