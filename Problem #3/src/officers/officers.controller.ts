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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Officer as OfficerInterface } from './interface/officer.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Action } from 'src/role/role.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Officer } from './officers';
import { Tools } from 'src/utils/tools';

// @ApiBearerAuth()
@ApiTags('officers')
@Controller('officers')
export class OfficersController {
  constructor(
    private readonly officersService: OfficersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  //TODO get user's information
  //! REQUIRE Bearer Token

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get your information',
    description: 'Return your information in JSON if you are logged in',
  })
  @ApiOkResponse({
    description: 'OK',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          uid: { type: 'string' },
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          role: { type: 'string' },
          salray: { type: 'number' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Must included a bearer token in the headers',
    schema: {
      properties: {
        message: { type: 'string', example: 'Unauthorize' },
        statusCode: { type: 'number', example: '401' },
      },
    },
  })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findMe(@Request() req): Promise<string> {
    const user = await this.officersService.getId(req.user.uid);
    return JSON.stringify(user);
  }

  //TODO get all user's information
  //! REQUIRE Bearer Token

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all officer information',
    description: 'return all information of officers in object array',
  })
  @ApiOkResponse({
    description: "Return all officer's info",
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          uid: { type: 'string' },
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          role: { type: 'string' },
          salray: { type: 'number' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Must included a bearer token in the headers',
    schema: {
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statusCode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Insufficiency permission',
    schema: {
      properties: {
        message: { type: 'string', example: 'Insufficiency permission' },
        statusCode: { type: 'number', example: '403' },
      },
    },
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req): string | HttpException {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.READ, Officer)) {
      return JSON.stringify(this.officersService.findAll());
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Search officer',
    description:
      'Search officer by uid, firstname, lastname or role via query params',
  })
  @ApiOkResponse({
    description: "Return all officer's info",
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          uid: { type: 'string' },
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          role: { type: 'string' },
          salray: { type: 'number' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Must included a bearer token in the headers',
    schema: {
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statusCode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Insufficiency permission',
    schema: {
      properties: {
        message: { type: 'string', example: 'Insufficiency permission' },
        statusCode: { type: 'number', example: '403' },
      },
    },
  })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'lastname', required: false })
  @ApiQuery({ name: 'firstname', required: false })
  @ApiQuery({ name: 'id', required: false })
  @Get('search')
  @UseGuards(JwtAuthGuard)
  async search(@Req() req, @Query() query): Promise<string | HttpException> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.SEARCH, Officer)) {
      const officers = await this.officersService.search(query);
      return JSON.stringify(officers);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  //TODO create new user profile
  //! REQUIRE Bearer Token

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a user account',
    description: "Add an officer's information to a database.",
  })
  @ApiCreatedResponse({
    description: 'Successfully create user account',
    schema: { $ref: getSchemaPath(CreateOfficerDto) },
  })
  @ApiUnauthorizedResponse({
    description: 'Must included a bearer token in the headers',
    schema: {
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statusCode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
    schema: {
      properties: {
        message: { type: 'string', example: 'Invalid request body' },
        statusCode: { type: 'number', example: '400' },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Insufficiency permission',
    schema: {
      properties: {
        message: { type: 'string', example: 'Insufficiency permission' },
        statusCode: { type: 'number', example: '403' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'User is already existed',
    schema: {
      properties: {
        message: { type: 'string', example: 'User is already existed' },
        statusCode: { type: 'number', example: '409' },
      },
    },
  })
  @ApiBody({
    type: CreateOfficerDto,
    required: true,
    description: "User's information",
  })
  async create(
    @Req() req,
    @Body() createOfficerDto: CreateOfficerDto,
  ): Promise<string | HttpException> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.CREATE, Officer)) {
      if (
        (await Tools.isDataValid(createOfficerDto)) &&
        Tools.getObjLen(createOfficerDto) === 6
      ) {
        if (await this.officersService.create(createOfficerDto)) {
          return JSON.stringify(createOfficerDto);
        }
        throw new HttpException('User is already existed', HttpStatus.CONFLICT);
      }
      throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  //! CANNOT Update uid

  @ApiBearerAuth()
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
      throw new HttpException('Not Match', HttpStatus.PRECONDITION_FAILED);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string): Promise<HttpException> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.DELETE, Officer)) {
      if (await this.officersService.remove(id)) {
        throw new HttpException('Successful', HttpStatus.NO_CONTENT);
      }
      throw new HttpException('Not Match', HttpStatus.PRECONDITION_FAILED);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @Get('factory/:amount')
  factory(@Param('amount') amount: number): OfficerInterface[] {
    return this.officersService.factory(amount);
  }
}
