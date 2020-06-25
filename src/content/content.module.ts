import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContentController } from './content.controller'
import { ContentService } from './content.service'
import { Content } from './content.entity'

@Module({
    controllers: [ContentController],
    imports: [TypeOrmModule.forFeature([Content])],
    providers: [ContentService]
})
export class MenuModule {}
