import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import checkEmptyObj from 'src/common/checkEmpty/checkEmptyObj'

@Injectable()
export class DefaultPaginationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {

    if (checkEmptyObj(value) || !value.page || !value.pageSize) {
      return {
        page: 1,
        pageSize: 10,
        ...value,
      }
    }
    return value;
  }
}