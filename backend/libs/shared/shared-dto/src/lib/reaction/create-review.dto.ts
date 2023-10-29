import { ApiProperty } from "@nestjs/swagger";
import { Max, MaxLength, Min, MinLength } from "class-validator";
import { RaitingCount, ReviewTextLength } from "../constant";

export class CreateReviewDto {
  @ApiProperty({
    description: 'Text comment'
  })
  @MinLength(ReviewTextLength.Min)
  @MaxLength(ReviewTextLength.Max)
  public text: string;

  @ApiProperty({
    description: 'Rating workout'
  })
  @Min(RaitingCount.Min)
  @Max(RaitingCount.Max)
  public rating: number;
}
