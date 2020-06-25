import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { Content } from './content.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentDto } from '../dto/content.dto';
import snowflake from '../common/snowflake';
import { ContentPaginationDto} from '../dto/content.pagination.dto'

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
    ) {}

    private logger = new Logger('ContentService');

    public async contentList(params : ContentPaginationDto) {
        const contents = await this.contentRepository
            .createQueryBuilder('c')
            .where('c.title like :title')
            .andWhere("c.status = :status")
            .setParameters({
                title: `%${params.title ? params.title : ''}%`, // 用户名模糊查询
                status: params.status
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
        const snowflakeId: string = snowflake.generate()
        dto.id = snowflakeId
        let newMenu: Content = Object.assign(new Content(), dto)
        await this.contentRepository.save(Object.assign(new Content(), newMenu))

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

    public async contentDetail(id: string) {
        const content = await this.contentRepository.findOne({ id })
        return {
            code: HttpStatus.OK,
            content
        }
    }
}
