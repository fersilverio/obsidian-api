import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SiginDto } from './dto/sigin.dto';
import { TransformPasswordPipe } from './pipes/transform-password.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth module")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @ApiOkResponse({ status: 200, description: "Success" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  sigIn(@Body() sigInDto: SiginDto) {
    return this.authService.signIn(sigInDto.email, sigInDto.password);
  }

  @Post("register")
  @UsePipes(ValidationPipe, TransformPasswordPipe)
  @ApiCreatedResponse({ description: "Created" })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  signUp(@Body() signUpDto: SignupDto) {
    return this.authService.signUp(signUpDto);
  }
}
