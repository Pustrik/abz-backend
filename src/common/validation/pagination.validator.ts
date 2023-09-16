import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationQuery {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  count: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(0)
  @IsOptional()
  offset?: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  page?: number;
}
