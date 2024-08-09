import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Consults {
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
}