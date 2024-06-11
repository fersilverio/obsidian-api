import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociateUserModule } from './associate-user/associate-user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AssociateUserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
