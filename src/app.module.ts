import { Module } from '@nestjs/common';
import { AssociateUserModule } from './associate-user/associate-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AssociateUserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
