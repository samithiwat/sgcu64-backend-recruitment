import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OfficersService } from './officers.service';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Officer } from './interface/officer.interface';

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
  async search(@Query() query) {
    const officers = await this.officersService.search(query);
    if (officers.length > 0) {
      return officers;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get(':id')
  async findId(@Param('id') id: string) {
    const officer: Officer = await this.officersService.getId(id);
    if (officer) {
      const { password, ...result } = officer;
      return JSON.stringify(result);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('factory/:amount')
  factory(@Param('amount') amount: number): Officer[] {
    return this.officersService.factory(amount);
  }

  @ApiBody({ type: UpdateOfficerDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfficerDto: UpdateOfficerDto,
  ): Promise<HttpException> {
    if (await this.officersService.update(id, updateOfficerDto)) {
      throw new HttpException('Updated', HttpStatus.CREATED);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<HttpException> {
    if (await this.officersService.remove(id)) {
      throw new HttpException('Success', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
