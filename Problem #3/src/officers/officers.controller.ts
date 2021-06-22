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
import { Officer as OfficerInterface } from './interface/officer.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Action } from 'src/role/role.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Officer } from './officers';
import { Tools } from 'src/utils/tools';

@ApiTags('officers')
@Controller('officers')
export class OfficersController {
  constructor(
    private readonly officersService: OfficersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateOfficerDto })
  async create(
    @Req() req,
    @Body() createOfficerDto: CreateOfficerDto,
  ): Promise<HttpException> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.CREATE, Officer)) {
      if (await this.officersService.create(createOfficerDto)) {
        throw new HttpException(
          'Successfully add user to database',
          HttpStatus.CREATED,
        );
      }
      throw new HttpException('invalid request body', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req): string | HttpException {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.READ, Officer)) {
      return JSON.stringify(this.officersService.findAll());
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get officer's info",
    description: 'check if fetch with cookie',
  })
  async findMe(@Request() req): Promise<string> {
    const user = await this.officersService.getId(req.user.uid);
    return JSON.stringify(user);
  }

  @ApiQuery({ name: 'firstname', required: false })
  @ApiQuery({ name: 'lastname', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'id', required: false })
  @Get('search')
  @UseGuards(JwtAuthGuard)
  async search(@Req() req, @Query() query): Promise<string | HttpException> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.SEARCH, Officer)) {
      const officers = await this.officersService.search(query);
      if (officers.length > 0) {
        return JSON.stringify(officers);
      }
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @Get('factory/:amount')
  factory(@Param('amount') amount: number): OfficerInterface[] {
    return this.officersService.factory(amount);
  }

  //! CANNOT Update uid
  @ApiBody({ type: UpdateOfficerDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateOfficerDto: UpdateOfficerDto,
  ): Promise<HttpException> {
    const { uid, password, ...info } = updateOfficerDto;
    const user: Officer = await this.officersService.getId(id);
    const ability = this.caslAbilityFactory.createForUser(req.user);
    let canUpdate = true;
    if (uid) {
      throw new HttpException(
        'Insufficiency permission',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password) {
      if (!ability.can(Action.UPDATE, new Officer(user), 'password')) {
        throw new HttpException(
          'Insufficiency permission',
          HttpStatus.FORBIDDEN,
        );
      }
    }
    if (Tools.getObjLen(info) > 0) {
      if (Tools.isDataValid(updateOfficerDto)) {
        if (!ability.can(Action.UPDATE, user)) {
          canUpdate = false;
        }
      } else {
        throw new HttpException('Invalid requst body', HttpStatus.BAD_REQUEST);
      }
    }
    if (canUpdate) {
      if (await this.officersService.update(id, updateOfficerDto)) {
        throw new HttpException('Updated', HttpStatus.CREATED);
      }
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string): Promise<HttpException> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.DELETE, Officer)) {
      if (await this.officersService.remove(id)) {
        throw new HttpException('Success', HttpStatus.OK);
      }
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @UseGuards(JwtAuthGuard)
  @Get('permission')
  permission(@Req() req): boolean {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    return ability.can(Action.UPDATE, new Officer(req.user), 'password');
  }
}
