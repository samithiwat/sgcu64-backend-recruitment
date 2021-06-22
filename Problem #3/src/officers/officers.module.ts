import { Module } from '@nestjs/common';
import { OfficersService } from './officers.service';
import { OfficersController } from './officers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Officer } from './entities/officer.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Officer]), CaslModule],
  controllers: [OfficersController],
  providers: [OfficersService],
  exports: [OfficersService],
})
export class OfficersModule {}
