import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { Officer } from './entities/officer.entity';

@Injectable()
export class OfficersService {
  constructor(
    @InjectRepository(Officer) private officerRepository: Repository<Officer>,
  ) {}

  create(createOfficerDto: CreateOfficerDto) {
    return this.officerRepository.create(createOfficerDto);
  }

  findAll() {
    return this.officerRepository.find();
  }

  findOne(id: number) {
    return this.officerRepository.findOne(id);
  }

  update(id: number, updateOfficerDto: UpdateOfficerDto) {
    return this.officerRepository.update(id, updateOfficerDto);
  }

  remove(id: number) {
    return this.officerRepository.delete(id);
  }
}
