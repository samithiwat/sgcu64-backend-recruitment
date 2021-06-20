import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OfficersService } from './officers.service';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('officers')
@Controller('officers')
export class OfficersController {
  constructor(private readonly officersService: OfficersService) {}

  @ApiBody({ type: CreateOfficerDto })
  @Post()
  create(@Body() createOfficerDto: CreateOfficerDto) {
    return this.officersService.create(createOfficerDto);
  }

  @Get()
  findAll() {
    return this.officersService.findAll();
  }

  @ApiQuery({ name: 'firstname', required: false })
  @ApiQuery({ name: 'lastname', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'id', required: false })
  @Get('search')
  search(@Query() query) {
    return this.officersService.search(query);
  }

  @Get(':id')
  findId(@Param('id') id: string) {
    return this.officersService.getId(id);
  }

  @Get('factory/:amount')
  factory(@Param('amount') amount: number) {
    return this.officersService.factory(amount);
  }

  @ApiBody({ type: UpdateOfficerDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficerDto: UpdateOfficerDto) {
    return this.officersService.update(id, updateOfficerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officersService.remove(+id);
  }
}
