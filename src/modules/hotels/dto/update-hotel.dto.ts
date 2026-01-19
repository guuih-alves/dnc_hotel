import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDTO } from './create-hotel.dto.js';

export class UpdateHotelDTO extends PartialType(CreateHotelDTO) {}
