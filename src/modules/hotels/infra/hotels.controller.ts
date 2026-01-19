import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateHotelsService } from '../services/createHotel.services.js';
import { CreateHotelDTO } from '../dto/create-hotel.dto.js';
import { UpdateHotelDTO } from '../dto/update-hotel.dto.js';
import { FindAllHotelService } from '../services/findAllHotel.services.js';
import { FindOneHotelService } from '../services/findOneHotel.service.js';
import { RemoveHotelService } from '../services/removeHotel.services.js';
import { UpdateHotelService } from '../services/updateHotel.services.js';
import { ParamId } from '../../../shared/decorators/paramId.decorator.js';
import { FindByOwnerHotelService } from '../services/findByOwner.services.js';
import { FindByNameHotelService } from '../services/FindByName.services.js';
import { AuthGuard } from '../../../shared/guards/auth.guard.js';
import { RoleGuard } from '../../../shared/guards/role.guard.js';
import { Roles } from '../../../shared/decorators/roles.decorators.js';
import { Role } from '@prisma/client';
import { OwnerHotelGuard } from '../../../shared/guards/ownerHotel.guard.js';
import { User } from '../../../shared/decorators/user.decorators.js';

@UseGuards(AuthGuard, RoleGuard)
@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotelService: CreateHotelsService,
    private readonly findAllHotelService: FindAllHotelService,
    private readonly findOneHotelService: FindOneHotelService,
    private readonly updateHotelService: UpdateHotelService,
    private readonly removeHotelService: RemoveHotelService,
    private readonly findHotelByOwnerService: FindByOwnerHotelService,
    private readonly findHotelByNameService: FindByNameHotelService,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@User('id') id: number, @Body() createHotelDto: CreateHotelDTO) {
    return this.createHotelService.execute(createHotelDto, id);
  }

  //@Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.findAllHotelService.execute();
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('name')
  findName(@Query('name') name: string) {
    return this.findHotelByNameService.execute(name);
  }

  @Roles(Role.ADMIN)
  @Get('owner')
  findOwner(@User('id') id: number) {
    return this.findHotelByOwnerService.execute(id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findOneHotelService.execute(id);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDTO) {
    return this.updateHotelService.execute(id, updateHotelDto);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@ParamId() id: number) {
    return this.removeHotelService.execute(+id);
  }
}
