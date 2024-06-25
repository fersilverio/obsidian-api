import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AssociateUserService } from 'src/associate-user/associate-user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService unit tests', () => {
  let sut: AuthService;
  let associatedService: AssociateUserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AssociateUserService,
        JwtService,
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    associatedService = module.get<AssociateUserService>(AssociateUserService);
  });


  describe("sigIn functionality", () => {
    it("Should fail when user password does not check", async () => {
      const spyFindByEmail = jest.spyOn(associatedService, "findOneByEmail");
    });


  });


});
