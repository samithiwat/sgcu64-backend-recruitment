import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { Officer } from './interface/officer.interface';
import { Officer as OfficerEntity } from './entities/officer.entity';
import { Tools } from 'src/utils/tools';

@Injectable()
export class OfficersService {
  private readonly officers: Officer[] = [];
  constructor(
    @InjectRepository(OfficerEntity)
    private officerRepository: Repository<Officer>,
  ) {}

  create(createOfficerDto: CreateOfficerDto) {
    this.officers.push(createOfficerDto);
    // return this.officerRepository.create(createOfficerDto);
  }

  findAll() {
    return this.officers;
    // return this.officerRepository.find();
  }

  findId(id: string) {
    for (const officer of this.officers) {
      if (officer.uid === id) {
        return JSON.stringify(officer);
      }
    }
    // return this.officerRepository.findOne(id);
  }

  findFirstname(firstname: string) {
    const result: Officer[] = [];
    for (const officer of this.officers) {
      if (officer.firstName === firstname) {
        result.push(officer);
      }
    }
    return result;
  }

  findLastname(lastname: string) {
    const result: Officer[] = [];
    for (const officer of this.officers) {
      if (officer.lastName === lastname) {
        result.push(officer);
      }
    }
    return result;
  }

  findRole(role: string) {
    const result: Officer[] = [];
    for (const officer of this.officers) {
      if (officer.role === role) {
        result.push(officer);
      }
    }
    return result;
  }

  update(id: number, updateOfficerDto: UpdateOfficerDto) {
    if (id - 1 < this.officers.length) {
      if (
        typeof updateOfficerDto.firstName != 'undefined' &&
        updateOfficerDto.firstName
      ) {
        this.officers[id - 1].firstName = updateOfficerDto.firstName;
      }
      if (
        typeof updateOfficerDto.lastName != 'undefined' &&
        updateOfficerDto.lastName
      ) {
        this.officers[id - 1].lastName = updateOfficerDto.lastName;
      }
      if (
        typeof updateOfficerDto.password != 'undefined' &&
        updateOfficerDto.password
      ) {
        this.officers[id - 1].password = updateOfficerDto.password;
      }
      if (
        typeof updateOfficerDto.role != 'undefined' &&
        updateOfficerDto.role
      ) {
        this.officers[id - 1].role = updateOfficerDto.role;
      }
      if (
        typeof updateOfficerDto.salary != 'undefined' &&
        updateOfficerDto.salary
      ) {
        this.officers[id - 1].salary = updateOfficerDto.salary;
      }
      if (typeof updateOfficerDto.uid != 'undefined' && updateOfficerDto.uid) {
        this.officers[id - 1].uid = updateOfficerDto.uid;
      }
      return HttpCode(201);
    }
    return HttpCode(400);
    // return this.officerRepository.update(id, updateOfficerDto);
  }

  remove(id: number) {
    if (id - 1 < this.officers.length) {
      this.officers.splice(id - 1, 1);
    }
    // return this.officerRepository.delete(id);
  }

  factory(nData: number): Officer[] {
    const uidList = Tools.createRandomUID(nData);
    const firstnameList = Tools.createRandomFirstname(nData);
    const lastnameList = Tools.createRandomLastname(nData);
    const passwordList = Tools.createRandomPassword(nData);
    const roleList = Tools.createRandomRole(nData);
    const salaryList = Tools.createRandomSalary(nData);
    for (let i = 0; i < nData; i++) {
      this.officers.push({
        uid: uidList[i],
        password: passwordList[i],
        firstName: firstnameList[i],
        lastName: lastnameList[i],
        role: roleList[i],
        salary: salaryList[i],
      });
    }
    return this.officers;
  }
}
