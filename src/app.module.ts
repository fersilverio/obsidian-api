import { Module } from '@nestjs/common';
import { AssociateUserModule } from './associate-user/associate-user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    AssociateUserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
