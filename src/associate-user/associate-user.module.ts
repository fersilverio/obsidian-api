import { Module } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { AssociateUserController } from './associate-user.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaAssociateUserRepository } from './repositories/prisma-associate-user.repository';

@Module({
  controllers: [AssociateUserController],
  providers: [
    {
      provide: "PrismaService",
      useClass: PrismaService,
    },
    {
      provide: "AssociateUsersRepository",
      useFactory: (prisma: PrismaService) => {
        return new PrismaAssociateUserRepository(prisma)
      },
      inject: ["PrismaService"],
    },

    AssociateUserService,
  ],
  exports: [AssociateUserService],
})
export class AssociateUserModule { }
