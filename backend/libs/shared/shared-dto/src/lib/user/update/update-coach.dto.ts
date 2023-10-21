import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, MaxLength, MinLength } from "class-validator";
import { DescriptionLength } from "../../constant";

export class UpdateCoachDto {
  @ApiProperty({
    description: 'Success description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  @IsOptional()
  successInfo?: string;

  @ApiProperty({
    description: 'Open for personal training flag',
  })
  @IsBoolean()
  @IsOptional()
  isPersonal?: boolean;
}
