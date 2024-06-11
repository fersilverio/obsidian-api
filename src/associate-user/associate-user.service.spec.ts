import { Test, TestingModule } from '@nestjs/testing';
import { AssociateUserService } from './associate-user.service';

describe('AssociateUserService', () => {
  let service: AssociateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociateUserService],
    }).compile();

    service = module.get<AssociateUserService>(AssociateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
