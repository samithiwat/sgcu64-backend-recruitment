import { Module } from '@nestjs/common';
import { OfficersService } from './officers.service';
import { OfficersController } from './officers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Officer } from './entities/officer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Officer])],
  controllers: [OfficersController],
  providers: [OfficersService],
  exports: [OfficersService],
})
export class OfficersModule {}
