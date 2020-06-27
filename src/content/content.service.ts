import { Injectable, Logger, HttpStatus, Inject } from '@nestjs/common';
import { Content } from './content.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentDto } from '../dto/content.dto';
import snowflake from '../common/snowflake';
import { ContentPaginationDto} from '../dto/content.pagination.dto'
import { ClientProxy } from '@nestjs/microservices'
import { PostStatus } from '../enum/post.status.enum'

@Injectable()
export class ContentService {
    constructor(
        @Inject('ACCOUNT_CLIENT')
        private readonly client: ClientProxy,
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
    ) {}

    private logger = new Logger('ContentService');

    public async contentList(params : ContentPaginationDto) {
        const contents = await this.contentRepository
            .createQueryBuilder('c')
            .where('c.title like :title')
            .andWhere("c.status = :status")
            .andWhere("c.authorId = :authorId")
            .setParameters({
                title: `%${params.title ? params.title : ''}%`, // 用户名模糊查询
                status: params.status,
                authorId: params.authorId
            })
            .orderBy('c.id', 'DESC')
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .getManyAndCount()

        this.logger.log(contents)
        return {
            code: HttpStatus.OK,
            data: contents[0],
            total: contents[1]
        }
    }

    public async posts(params : ContentPaginationDto) {
        const contents = await this.contentRepository
            .createQueryBuilder('c')
            .andWhere("c.status = :status")
            .setParameters({
                status: PostStatus.Release,
            })
            .orderBy('c.id', 'DESC')
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .getManyAndCount()

        this.logger.log(contents)
        return {
            code: HttpStatus.OK,
            data: contents[0],
            total: contents[1]
        }
    }

    public async createPost(dto: ContentDto) {
        const user = await this.client.send({ cmd: 'user detail' }, dto.authorId).toPromise()
        .catch(error => {
            this.logger.error(error)
        })
        const snowflakeId: string = snowflake.generate()
        dto.id = snowflakeId
        dto.anthor = user.name
        let newPost: Content = Object.assign(new Content(), dto)
        await this.contentRepository.save(Object.assign(new Content(), newPost))

        return {
            code: HttpStatus.OK
        }
    }

    public async editPost(dto: ContentDto) {
        await this.contentRepository.update(dto.id, dto)

        return {
            code: HttpStatus.OK
        }
    }

    public async deletePost(id: string) {
        await this.contentRepository.delete(id)
        return {
            code: HttpStatus.OK
        }
    }

    public async contentDetail(params: any) {
        const { userId, id} = params
        console.log(userId)
        const user = await this.client.send({ cmd: 'user detail' }, userId).toPromise()
        .catch(error => {
            this.logger.error(error)
        })
        this.logger.log(user)
        const content = await this.contentRepository.findOne({ id })
        this.logger.log(content)
        return {
            code: HttpStatus.OK,
            content
        }
    }
}
