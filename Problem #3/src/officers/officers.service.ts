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

  search(query): Officer[] {
    let filter: Officer[] = [];
    let temp: Officer[] = [];
    let result: Officer[] = [];
    let isFiltered = false;
    if (query.id != 'undefined' && query.id) {
      filter = this.findId(query.id, this.officers);
      isFiltered = true;
    }
    result = filter;
    temp = this.officers;
    if (query.firstname != 'undefined' && query.firstname) {
      if (filter.length > 0 || isFiltered) {
        temp = filter;
      }
      filter = this.findFirstname(query.firstname, temp);
      isFiltered = true;
    }
    result = filter;
    temp = this.officers;
    if (query.lastname != 'undefined' && query.lastname) {
      if (filter.length > 0 || isFiltered) {
        temp = filter;
      }
      filter = this.findLastname(query.lastname, temp);
      isFiltered = true;
    }
    result = filter;
    temp = this.officers;
    if (query.role != 'undefined' && query.role) {
      if (filter.length > 0 || isFiltered) {
        temp = filter;
      }
      filter = this.findRole(query.role, temp);
    }
    result = filter;
    return result;
  }

  getId(id: string) {
    for (const officer of this.officers) {
      if (officer.uid === id) {
        return JSON.stringify(officer);
      }
    }
    // return this.officerRepository.findOne(id);
  }

  findId(id: string, filters: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filters) {
      if (officer.uid === id) {
        result.push(officer);
      }
    }
    return result;
  }

  findFirstname(firstname: string, filter: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filter) {
      if (officer.firstName.toLowerCase() === firstname.toLowerCase()) {
        result.push(officer);
      }
    }
    return result;
  }

  findLastname(lastname: string, filter: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filter) {
      if (officer.lastName.toLowerCase() === lastname.toLowerCase()) {
        result.push(officer);
      }
    }
    return result;
  }

  findRole(role: string, filter: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filter) {
      if (officer.role.toLowerCase() === role.toLowerCase()) {
        result.push(officer);
      }
    }
    return result;
  }

  update(id: string, updateOfficerDto: UpdateOfficerDto) {
    console.log(id);
    console.log(updateOfficerDto);
    const officer: Officer = this.findId(id, this.officers)[0];
    if (officer) {
      console.log('ENTER');
      if (
        typeof updateOfficerDto.firstName != 'undefined' &&
        updateOfficerDto.firstName
      ) {
        officer.firstName = updateOfficerDto.firstName;
      }
      if (
        typeof updateOfficerDto.lastName != 'undefined' &&
        updateOfficerDto.lastName
      ) {
        officer.lastName = updateOfficerDto.lastName;
      }
      if (
        typeof updateOfficerDto.password != 'undefined' &&
        updateOfficerDto.password
      ) {
        officer.password = updateOfficerDto.password;
      }
      if (
        typeof updateOfficerDto.role != 'undefined' &&
        updateOfficerDto.role
      ) {
        officer.role = updateOfficerDto.role;
      }
      if (
        typeof updateOfficerDto.salary != 'undefined' &&
        updateOfficerDto.salary
      ) {
        officer.salary = updateOfficerDto.salary;
      }
      if (typeof updateOfficerDto.uid != 'undefined' && updateOfficerDto.uid) {
        officer.uid = updateOfficerDto.uid;
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
