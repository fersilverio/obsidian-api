import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AssociateUserService } from 'src/associate-user/associate-user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly associateUserService: AssociateUserService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(email: string, pass: string): Promise<{ token: string }> {
    const user = await this.associateUserService.findOneByEmail(email);


    const checkPassword = await compare(pass, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload)
    };
  }

  async signUp(data: SignupDto) {
    const user = await this.associateUserService.findOneByEmail(data.email);

    if (user) {
      throw new BadRequestException("User already exists");
    }

    const createdUser = await this.associateUserService.create(data);

    if (createdUser) {
      return {
        statusCode: 200,
        message: 'Register success',
      }
    }
    throw new BadRequestException();
  }
}
