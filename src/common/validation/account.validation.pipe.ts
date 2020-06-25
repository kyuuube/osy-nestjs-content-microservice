import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    HttpStatus
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import * as _ from 'lodash'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        const object = plainToClass(metatype, value)
        const errors = await validate(object)
        // Logger.log(errors);
        if (errors.length > 0) {
            // 遍历全部的错误信息,返回给前端
            const errorMessage = errors.map(
                item => _.values(item.constraints)[0]
            )
            throw new RpcException({
                message: errorMessage[0],
                code: HttpStatus.INTERNAL_SERVER_ERROR
            })
        }
        return value
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
