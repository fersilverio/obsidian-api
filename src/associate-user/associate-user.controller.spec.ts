import { Test, TestingModule } from '@nestjs/testing';
import { AssociateUserController } from './associate-user.controller';
import { AssociateUserService } from './associate-user.service';

describe('AssociateUserController', () => {
  let controller: AssociateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateUserController],
      providers: [AssociateUserService],
    }).compile();

    controller = module.get<AssociateUserController>(AssociateUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
