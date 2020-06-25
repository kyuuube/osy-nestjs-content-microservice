import { Controller, Logger, UsePipes } from '@nestjs/common';
import { ContentService } from './content.service';
import { MessagePattern } from '@nestjs/microservices';
import { ValidationPipe } from '../common/validation/account.validation.pipe';
import { ContentDto } from './content.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('content')
export class ContentController {
    private logger = new Logger('Account service');
    constructor(private readonly contentService: ContentService) {}

    @MessagePattern({ cmd: 'content list' })
    public getContenList(dto: PaginationDto) {
        return this.contentService.contentList(dto)
    }

    @UsePipes(new ValidationPipe())
    @MessagePattern({ cmd: 'create post' })
    public createMenu(dto: ContentDto) {
        return this.contentService.createPost(dto)
    }

    @UsePipes(new ValidationPipe())
    @MessagePattern({ cmd: 'edit post' })
    public editMenu(dto: ContentDto) {
        return this.contentService.editPost(dto)
    }

    @MessagePattern({ cmd: 'del post' })
    public deleteMenu(id: string) {
        return this.contentService.deletePost(id)
    }

    @MessagePattern({ cmd: 'post detail' })
    public menuDetail(id: string) {
        return this.contentService.contentDetail(id)
    }
}
