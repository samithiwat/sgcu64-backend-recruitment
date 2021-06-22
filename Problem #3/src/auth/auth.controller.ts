import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthStrategy } from './auth.strategy';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authStrategy: AuthStrategy) {}

  @Post('authorize')
  async login(@Body() body: AuthDto, @Res({ passthrough: true }) res) {
    return await this.authStrategy.validate(body.uid, body.password, res);
    // return this.authStrategy.validate(body.uid, body.password);
  }
}
