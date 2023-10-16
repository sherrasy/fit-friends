import {plainToInstance, ClassConstructor} from 'class-transformer';
import dayjs from 'dayjs';

export const getDate = ()=>{
  return dayjs().toISOString()
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

