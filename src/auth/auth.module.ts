import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AssociateUserModule } from 'src/associate-user/associate-user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Module({
  imports: [
    AssociateUserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "3600s",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule { }
