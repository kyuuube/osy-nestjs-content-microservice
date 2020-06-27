import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContentController } from './content.controller'
import { ContentService } from './content.service'
import { Content } from './content.entity'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    controllers: [ContentController],
    imports: [
        TypeOrmModule.forFeature([Content]),        
        ClientsModule.register([{
            name: 'ACCOUNT_CLIENT',
            transport: Transport.TCP,
            options: {
            host: '127.0.0.1',
            port: 8877,
            }
        }])
    ],
    providers: [ContentService]
})
export class MenuModule {}
