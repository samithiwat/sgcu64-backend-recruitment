import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthStrategy } from './auth.strategy';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authStrategy: AuthStrategy) {}

  @ApiOperation({
    summary: 'Login for token',
    description: 'Login and get an access_token',
  })
  @ApiCreatedResponse({
    description: 'Successfully logged in and return your access_token',
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
    description: 'Invalid uid or password',
    schema: {
      properties: {
        message: { type: 'string', example: 'Unauthorize' },
        statusCode: { type: 'number', example: '401' },
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
