import { ClassConstructor, plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import { HostName, ParseTimeError } from './constant';

export const getDate = () => {
  return dayjs().toISOString();
};

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`${ParseTimeError.Mismatch} ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(ParseTimeError.IsNaN);
  }

  return { value, unit };
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `${HostName.Mongo}://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}): string {
  return `${HostName.Rabbit}://${user}:${password}@${host}:${port}`;
}
