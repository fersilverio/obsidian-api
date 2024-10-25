import { Module } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { AssociateUserController } from './associate-user.controller';
import { PrismaAssociateUserRepository } from './repositories/prisma/prisma-associate-user.repository';
import { PrismaService } from 'prisma/prisma.service';

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
