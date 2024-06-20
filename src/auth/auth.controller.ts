import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SiginDto } from './dto/sigin.dto';
import { TransformPasswordPipe } from './pipes/transform-password.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  sigIn(@Body() sigInDto: SiginDto) {
    return this.authService.signIn(sigInDto.email, sigInDto.password);
  }

  @Post("register")
  @UsePipes(ValidationPipe, TransformPasswordPipe)
  signUp(@Body() signUpDto: SignupDto) {
    return this.authService.signUp(signUpDto);
  }
}
