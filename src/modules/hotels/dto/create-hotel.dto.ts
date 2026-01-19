import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateHotelDTO {
  @IsString() @IsNotEmpty() @MaxLength(255) name: string;
  @IsString() @MaxLength(255) description: string;
  @IsNumber() price: number;
  @IsString() address: string;
  @IsNumber() @IsOptional() ownerId: number;
}
