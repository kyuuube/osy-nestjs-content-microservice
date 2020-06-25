import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Content {
    @PrimaryColumn({
        length: 128,
        default: '',
    })
    @IsNotEmpty()
    @IsString()
    public id: string;

    @Column({
        length: 128,
        default: '',
    })
    @IsNotEmpty()
    @IsString()
    public title: string;

    @Column()
    public content: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    public updatedAt: Date;
}
