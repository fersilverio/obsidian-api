import { Module } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { AssociateUserController } from './associate-user.controller';

@Module({
  controllers: [AssociateUserController],
  providers: [AssociateUserService],
})
export class AssociateUserModule {}
