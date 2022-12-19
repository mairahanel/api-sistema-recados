import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity({
    name: "usuario"
})
export class UserEntity {

    @PrimaryColumn()
    id!: string;

    @Column({
        length: 60,
        unique: true
    })
    email!: string;

    @Column({
        length: 20,
        select: false
    })
    senha!: string;

    @Column({
        length: 20,
        select: false
    })
    v_senha!: string;

    @OneToMany(() => TaskEntity, (task) => task.usuario)
    tasks!: TaskEntity[];
}