import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociateUserModule } from './associate-user/associate-user.module';

@Module({
  imports: [AssociateUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
