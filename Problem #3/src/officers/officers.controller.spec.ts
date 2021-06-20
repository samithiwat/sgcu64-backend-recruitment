import { Test, TestingModule } from '@nestjs/testing';
import { OfficersController } from './officers.controller';
import { OfficersService } from './officers.service';

describe('OfficersController', () => {
  let controller: OfficersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficersController],
      providers: [OfficersService],
    }).compile();

    controller = module.get<OfficersController>(OfficersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
