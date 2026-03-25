import { PartialType } from '@nestjs/mapped-types';
import { CreateuserDTO } from '../../../users/domain/dto/createUser.dto';

export class AuthRegisterDTO extends PartialType(CreateuserDTO) {}
