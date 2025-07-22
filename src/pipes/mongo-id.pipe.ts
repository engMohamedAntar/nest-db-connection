import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseMongoIDPipe implements PipeTransform {
  transform(value: string) {
    if(!Types.ObjectId.isValid(value))
        throw new BadRequestException(`${value} is not a valid mongoId`);
    return value;
  }
}
