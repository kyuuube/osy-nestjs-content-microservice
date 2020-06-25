import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { Content } from './content.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentDto } from './content.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import snowflake from '../common/snowflake';


@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private readonly contentRepository: Repository<Content>,
    ) {}

    private logger = new Logger('ContentService');

    public async contentList(params: PaginationDto) {
        const contents = await this.contentRepository
            .createQueryBuilder('c')
            .orderBy('c.id', 'DESC')
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
