import { PartialType } from '@nestjs/mapped-types';
import { CreateuserDTO } from '../../../users/domain/dto/createUser.dto.js';

export class AuthRegisterDTO extends PartialType(CreateuserDTO) {}
