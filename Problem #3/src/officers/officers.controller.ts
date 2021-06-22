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
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OfficersService } from './officers.service';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Officer } from './interface/officer.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RoleGuard } from 'src/role/role.guard';

@ApiTags('officers')
@Controller('officers')
export class OfficersController {
  constructor(private readonly officersService: OfficersService) {}

  @Post()
  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBody({ type: CreateOfficerDto })
  async create(@Req() req, @Body() createOfficerDto: CreateOfficerDto) {
    console.log(req.user);
    if (await this.officersService.create(createOfficerDto)) {
      throw new HttpException(
        'Successfully add user to database',
        HttpStatus.CREATED,
      );
    }
    throw new HttpException('invalid request body', HttpStatus.BAD_REQUEST);
  }

  @Get()
  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll() {
    return this.officersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get officer's info",
    description: 'check if fetch with cookie',
  })
  async findMe(@Request() req) {
    return req.user;
  }

  @ApiQuery({ name: 'firstname', required: false })
  @ApiQuery({ name: 'lastname', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'id', required: false })
  @Get('search')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.HR)
  async search(@Query() query) {
    const officers = await this.officersService.search(query);
    if (officers.length > 0) {
      return officers;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findId(@Param('id') id: string, @Req() req) {
    console.log(req.cookies['access_token']);
    console.log(req.headers);
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
  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard, RoleGuard)
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

  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<HttpException> {
    if (await this.officersService.remove(id)) {
      throw new HttpException('Success', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
