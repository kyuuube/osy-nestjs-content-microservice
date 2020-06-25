import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { MenuModule } from './content/content.module';

dotenv.config();
@Module({
    imports: [
        TypeOrmModule.forRoot({
            database: 'content',
            entities: [join(__dirname, './**/*.entity{.ts,.js}')],
            host: process.env.DB_HOST,
            password: process.env.DB_ADMIN_PASSWORD,
            port: 3306,
            synchronize: true,
            type: 'mysql',
            username: process.env.DB_ADMIN_USERNAME,
        }),
        MenuModule,
    ],
})
export class AppModule {}
