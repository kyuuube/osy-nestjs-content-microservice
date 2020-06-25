import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
export function RepositoryWarp(options: string = 'query') {
    const logger = new Logger('repositoryWarp')
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value

        descriptor.value = async function(...args: any[]) {
            const result = await method.apply(this, args)

            if (!result && options === 'query') {
                throw new RpcException({ code: 500, message: '获取失败' })
            }

            if (result.affected <= 0 && options === 'delete') {
                throw new RpcException({ code: 500, message: '删除失败' })
            }

            return {
                data: result
            }
        }

        return descriptor
    }
}
