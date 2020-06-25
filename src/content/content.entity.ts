import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { PostStatus } from '../enum/post.status.enum'

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

    @Column({
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.draft
    })
    public status!: PostStatus

    @CreateDateColumn({
        type: 'timestamp',
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    public updatedAt: Date;
}
