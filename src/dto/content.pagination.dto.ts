import { PaginationDto } from 'src/common/dto/pagination.dto'
import { PostStatus } from '../enum/post.status.enum'
import {IsNotEmpty } from 'class-validator'

export class ContentPaginationDto extends PaginationDto {
    public readonly userId: string
    public readonly title?: string
    public readonly authorId?: string
    @IsNotEmpty()
    public readonly status: PostStatus
}