import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
    name: "recado"
})
export class TaskEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    descricao!: string;

    @Column()
    detalhamento!: string;

    @Column()
    arquivado!: boolean;

    @Column()
    dthr_registro!: Date;

    @Column({
        nullable: true
    })
    dthr_atualizacao!: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "id_usuario"
    })
    usuario!: UserEntity;

    @Column({
        name: "id_usuario"
    })
    id_usuario!: string;
}