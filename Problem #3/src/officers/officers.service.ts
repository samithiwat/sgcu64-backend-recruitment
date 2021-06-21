import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';
import { Officer } from './interface/officer.interface';
import { Officer as OfficerEntity } from './entities/officer.entity';
import { Tools } from 'src/utils/tools';

@Injectable()
export class OfficersService {
  private readonly officers: Officer[] = [
    {
      uid: '1',
      firstName: 'smithy',
      lastName: 'binchu',
      password: '!password',
      role: 'HR',
      salary: 50000,
    },
  ];
  constructor(
    @InjectRepository(OfficerEntity)
    private officerRepository: Repository<Officer>,
  ) {}

  public create(createOfficerDto: CreateOfficerDto) {
    this.officers.push(createOfficerDto);
    // return this.officerRepository.create(createOfficerDto);
  }

  public findAll() {
    return this.officers;
    // return this.officerRepository.find();
  }

  public async search(query): Promise<Officer[]> {
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

  public async getId(id: string): Promise<Officer | undefined> {
    for (const officer of this.officers) {
      if (officer.uid === id) {
        // console.log(officer);
        return officer;
      }
    }
    // return this.officerRepository.findOne(id);
  }

  public findId(id: string, filters: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filters) {
      if (officer.uid === id) {
        result.push(officer);
      }
    }
    return result;
  }

  public findFirstname(firstname: string, filter: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filter) {
      if (officer.firstName.toLowerCase() === firstname.toLowerCase()) {
        result.push(officer);
      }
    }
    return result;
  }

  public findLastname(lastname: string, filter: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filter) {
      if (officer.lastName.toLowerCase() === lastname.toLowerCase()) {
        result.push(officer);
      }
    }
    return result;
  }

  public findRole(role: string, filter: Officer[]) {
    const result: Officer[] = [];
    for (const officer of filter) {
      if (officer.role.toLowerCase() === role.toLowerCase()) {
        result.push(officer);
      }
    }
    return result;
  }

  public async update(
    id: string,
    updateOfficerDto: UpdateOfficerDto,
  ): Promise<boolean> {
    const officer: Officer = await this.getId(id);
    if (officer) {
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
      return true;
    }
    return false;
    // return this.officerRepository.update(id, updateOfficerDto);
  }

  public async remove(id: string): Promise<boolean> {
    const index = this.findIndex(id);
    console.log(index);
    if (index >= 0) {
      this.officers.splice(index, 1);
      return true;
    }
    return false;
    // return this.officerRepository.delete(id);
  }

  public factory(nData: number): Officer[] {
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
  private findIndex(id: string): number {
    for (let index = 0; index < this.officers.length; index++) {
      if (this.officers[index].uid === id) {
        console.log(this.officers[index]);
        return index;
      }
    }
    return -1;
  }
}
