import { WorkoutTime } from '@backend/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, Max, Min } from 'class-validator';
import { CaloriesAmount } from '../../constant';

export class CreateSportsmanDto {
  @ApiProperty({
    description: 'Time for workout',
    enum: WorkoutTime,
  })
  @IsEnum(WorkoutTime)
  public workoutTime: WorkoutTime;

  @ApiProperty({
    description: 'Number of calories to reset',
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  public caloriesTotal: number;

  @ApiProperty({
    description: 'Number of calories to reset per day',
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'Ready for workout flag',
  })
  @IsBoolean()
  isReady: boolean;
}
