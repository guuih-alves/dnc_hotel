import { PartialType } from '@nestjs/mapped-types';
import { CreateuserDTO } from './createUser.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateUserDto extends PartialType(CreateuserDTO) {}
