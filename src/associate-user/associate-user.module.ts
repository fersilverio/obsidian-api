import { Module } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { AssociateUserController } from './associate-user.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaAssociateUserRepository } from './repositories/prisma-repository/prisma-associate-user.repository';
import { AssociateUsersRepository } from './repositories/associate-users.repository';

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
})
export class AssociateUserModule { }
