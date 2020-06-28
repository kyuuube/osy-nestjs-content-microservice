import { Logger } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExceptionFilter } from './common/filters/exceptionFilter'
import * as bodyParser from 'body-parser';

const logger = new Logger('Content service')

const microserviceOptions = {
    transport: Transport.TCP,
    options: {
        host: '127.0.0.1',
        port: 8878
    }
}

async function bootstrap() {
    const app = await NestFactory.createMicroservice(
        AppModule,
        microserviceOptions
    )
    app.useGlobalFilters(new ExceptionFilter())
    // app.use(bodyParser.json({limit: '50mb'}));
    // app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.listen(() => {
        logger.log('content microservice is listening')
    })
}
bootstrap()