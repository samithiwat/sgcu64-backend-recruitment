import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfficersService } from './officers.service';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('officers')
@Controller('officers')
export class OfficersController {
  constructor(private readonly officersService: OfficersService) {}

  @Post()
  create(@Body() createOfficerDto: CreateOfficerDto) {
    return this.officersService.create(createOfficerDto);
  }

  @Get()
  findAll() {
    return this.officersService.findAll();
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.officersService.findId(id);
  }

  @Get('firstname/:firstname')
  findFirstname(@Param('firstname') firstname: string) {
    return this.officersService.findFirstname(firstname);
  }

  @Get('lastname/:lastname')
  findLastname(@Param('lastname') lastname: string) {
    return this.officersService.findLastname(lastname);
  }

  @Get('role/:role')
  findRole(@Param('role') role: string) {
    return this.officersService.findRole(role);
  }

  @Get('factory/:amount')
  factory(@Param('amount') amount: number) {
    return this.officersService.factory(amount);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficerDto: UpdateOfficerDto) {
    return this.officersService.update(+id, updateOfficerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officersService.remove(+id);
  }
}
