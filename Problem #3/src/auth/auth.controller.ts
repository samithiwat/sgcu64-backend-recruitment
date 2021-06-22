import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthStrategy } from './auth.strategy';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authStrategy: AuthStrategy) {}

  @ApiCreatedResponse({
    description: 'Created',
    schema: {
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxIiwi...',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorize',
    schema: {
      properties: {
        message: { type: 'string', example: 'Unauthorize' },
        status: { type: 'number', example: '401' },
      },
    },
  })
  @ApiBody({
    description: "Requirement:  officer's uid and password",
    required: true,
    type: AuthDto,
  })
  @Post('authorize')
  async login(@Body() body: AuthDto, @Res({ passthrough: true }) res) {
    return await this.authStrategy.validate(body.uid, body.password, res);
    // return this.authStrategy.validate(body.uid, body.password);
  }
}
