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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Officer as OfficerInterface } from './interface/officer.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Action } from 'src/role/role.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Officer, OfficerInfo } from './officers';
import { Tools } from 'src/utils/tools';

@ApiTags('officers')
@Controller('officers')
export class OfficersController {
  constructor(
    private readonly officersService: OfficersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  //TODO get user's information
  //! REQUIRED Bearer Token

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get your information',
    description: 'Return your information in JSON if you are logged in',
  })
  @ApiOkResponse({
    description: 'OK',
    schema: { $ref: getSchemaPath(OfficerInfo) },
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
    const { password, ...info } = user;
    return JSON.stringify(info);
  }

  //TODO get all user's information
  //! REQUIRED Bearer Token and Role HR

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all officer information',
    description: 'return all information of officers in object array',
  })
  @ApiOkResponse({
    description: "Return all officer's info",
    schema: { type: 'array', items: { $ref: getSchemaPath(OfficerInfo) } },
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

  //TODO search officer by uid, firstname, lastname or role via query params
  //! REQUIRED Bearer Token and Role HR

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Search officer',
    description:
      'Search officer by uid, firstname, lastname or role via query params',
  })
  @ApiOkResponse({
    description: "Return searched officer's info",
    schema: { type: 'array', items: { $ref: getSchemaPath(OfficerInfo) } },
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
  @ApiQuery({
    name: 'role',
    description: 'role of user (HR or employee)',
    required: false,
  })
  @ApiQuery({
    name: 'lastname',
    description: 'lastname of user',
    required: false,
  })
  @ApiQuery({
    name: 'firstname',
    description: 'firstname of user',
    required: false,
  })
  @ApiQuery({
    name: 'id',
    description: 'id of user',
    required: false,
  })
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
  //! REQUIRED Bearer Token and Role HR

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

  //TODO update user's information from valid data in request body
  //! REQUIRED Bearer Token and Role HR
  //! CANNOT Update uid and the others password

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a user account',
    description: `Update a specific user information if request body is valided.\n
                  *CANNOT* update uid and the others password`,
  })
  @ApiOkResponse({
    description: "Return all officer's info",
    schema: { $ref: getSchemaPath(OfficerInfo) },
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
  @ApiNotFoundResponse({
    description: "Can't find user's id in database",
    schema: {
      properties: {
        message: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: '404' },
      },
    },
  })
  @ApiParam({ name: 'id', description: "A user's id that you want to update" })
  @ApiBody({ type: UpdateOfficerDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateOfficerDto: UpdateOfficerDto,
  ): Promise<string | HttpException> {
    const { uid, password, ...info } = updateOfficerDto;
    const user: Officer = await this.officersService.getId(id);
    const ability = this.caslAbilityFactory.createForUser(req.user);
    let canUpdate = true;
    if (uid) {
      throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
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
        const user = await this.officersService.getId(id);
        const { password, ...info } = user;
        return JSON.stringify(info);
      }
      throw new HttpException('Not Match', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  //TODO delete user account
  //! REQUIRED Bearer Token and Role HR

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a user account',
    description: `Delete a specific user account.`,
  })
  @ApiNoContentResponse({
    description: 'Successful : No content return',
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
  @ApiNotFoundResponse({
    description: "Can't find user's id in database",
    schema: {
      properties: {
        message: { type: 'string', example: 'Not Found' },
        statusCode: { type: 'number', example: '404' },
      },
    },
  })
  @ApiParam({ name: 'id', description: "A user's id that you want to delete" })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string): Promise<HttpException> {
    const ability = this.caslAbilityFactory.createForUser(req.user);
    if (ability.can(Action.DELETE, Officer)) {
      if (await this.officersService.remove(id)) {
        throw new HttpException('Successful', HttpStatus.NO_CONTENT);
      }
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Insufficiency permission', HttpStatus.FORBIDDEN);
  }

  @ApiOperation({
    summary: `Generate a mock user's data\n
     (for testing only not included in the main system)`,
    description: `Mock up some amount of user's data\n.
    **NOTE** for testing only not included in the main system`,
  })
  @ApiParam({
    name: 'amount',
    description: 'An amount of mock data that you want.',
  })
  @ApiOkResponse({
    description: "Return all officer's info",
    schema: { type: 'array', items: { $ref: getSchemaPath(CreateOfficerDto) } },
  })
  @Get('factory/:amount')
  factory(@Param('amount') amount: number): OfficerInterface[] {
    return this.officersService.factory(amount);
  }
}
