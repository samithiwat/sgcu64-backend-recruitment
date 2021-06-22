/* eslint-disable prettier/prettier */

export class Tools {
  public static async isDataValid(obj: any): Promise<boolean> {
    let countValid = 0;
    const objLen = this.getObjLen(obj);
    if (typeof obj.uid != 'undefined' && obj.uid) {
      countValid++;
    }
    if (typeof obj.firstName != 'undefined' && obj.firstName) {
      countValid++;
    }
    if (typeof obj.lastName != 'undefined' && obj.lastName) {
      countValid++;
    }
    if (typeof obj.password != 'undefined' && obj.password) {
      countValid++;
    }
    if (typeof obj.role != 'undefined' && obj.role) {
      if (obj.role === 'HR' || obj.role === 'employee') {
        countValid++;
      }
      return false;
    }
    if (typeof obj.salary != 'undefined' && obj.salary) {
      countValid++;
    }
    if (countValid === objLen) {
      return true;
    }
    return false;
  }

  public static getObjLen(obj: any) {
    let size = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        size++;
      }
    }
    return size;
  }

  public static findIndex(id: string, array: any[]): number {
    for (let index = 0; index < array.length; index++) {
      if (array[index].uid === id) {
        console.log(array[index]);
        return index;
      }
    }
    return -1;
  }

  public static getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public static createRandomString(strLen: number): string {
    const strList =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+';
    const strListLen = strList.length;
    let result = '';
    for (let i = 0; i < strLen; i++) {
      result += strList[this.getRandomNumber(strListLen)];
    }
    return result;
  }

  public static createRandomUID(nUID: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < nUID; i++) {
      result.push(this.getRandomNumber(10000).toString());
    }
    return result;
  }

  public static createRandomFirstname(nName: number): string[] {
    const nameList = [
      'Ake',
      'Ayesha',
      'Jess',
      'Jeffery',
      'Marsha',
      'Olaf',
      'Koa',
      'Elinor',
      'Megan',
      'Husnain',
      'Aneurin',
      'Libby',
      'Blane',
      'Michel',
      'John',
      'Atom',
      'Kenny',
      'Samantha',
      'Susan',
      'Lowe',
      'Angle',
      'Dave',
      'David',
      'Abdul',
      'Mohamet',
      'Dele',
      'Mephis',
      'Jinny',
      'Catherine',
      'Anne',
    ];
    const nameListLen = nameList.length;
    const result: string[] = [];
    for (let i = 0; i < nName; i++) {
      result.push(nameList[this.getRandomNumber(nameListLen)]);
    }
    return result;
  }

  public static createRandomLastname(nName: number): string[] {
    const nameList = [
      'Mccallum',
      'Mcintosh',
      'Payne',
      'Valdez',
      'Bateman',
      'Leon',
      'Burt',
      'Figueroa',
      'Manning',
      'Gale',
      'Bernard',
      'George',
      'Bevan',
      'Shaw',
      'Pruitt',
      'Rice',
      'Xavi',
      'Stone',
      'Robert',
      'Tony',
      'Eric',
      'Matteus',
      'Iniesta',
      'Puyol',
      'Alonse',
      'Ramos',
      'Thaigo',
      'Rafinha',
      'Pique',
    ];
    const nameListLen = nameList.length;
    const result: string[] = [];
    for (let i = 0; i < nName; i++) {
      result.push(nameList[this.getRandomNumber(nameListLen)]);
    }
    return result;
  }

  public static createRandomPassword(nPassword: number): string[] {
    const passwordLenList = [7, 8, 9, 10, 11, 12, 13, 14];
    const nPasswordLenList = passwordLenList.length;
    const result: string[] = [];
    for (let i = 0; i < nPassword; i++) {
      result.push(
        this.createRandomString(
          passwordLenList[this.getRandomNumber(nPasswordLenList)],
        ),
      );
    }
    return result;
  }

  public static createRandomRole(nRole: number): string[] {
    const roleList = ['employee', 'HR'];
    const roleListLen = roleList.length;
    const result: string[] = [];
    for (let i = 0; i < nRole; i++) {
      result.push(roleList[this.getRandomNumber(roleListLen)]);
    }
    return result;
  }

  public static createRandomSalary(nSalary: number): number[] {
    const salaryList = [
      10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
    ];
    const salaryListLen = salaryList.length;
    const result: number[] = [];
    for (let i = 0; i < nSalary; i++) {
      result.push(salaryList[this.getRandomNumber(salaryListLen)]);
    }
    return result;
  }
}
