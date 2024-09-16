import { CreateAssociateUserDto } from "src/associate-user/dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "src/associate-user/dto/update-associate-user.dto";
import { AssociateUser } from "src/associate-user/entities/associate-user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { AssociateUsersRepository } from "../associate-users.repository";
import { Prisma } from "@prisma/client";
import { sendPrismaErrorMessage } from "./errors/utils";
import { Role } from "src/associate-user/enums/roles";
import { PrismaService } from "prisma/prisma.service";
import { Roles } from "src/decorators/roles.decorator";

export class PrismaAssociateUserRepository implements AssociateUsersRepository {
    private logger = new Logger(PrismaAssociateUserRepository.name);

    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        const definedRole = data.role ?? Role.User;

        try {
            const user = await this.prisma.associateUser.create({ data: { ...data, role: definedRole } });
            return user;
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                this.logger.error(sendPrismaErrorMessage(err));
            }

            throw new InternalServerErrorException("Could not create user!");
        }
    }
    async findUserById(id: number): Promise<AssociateUser> {
        try {
            const user = await this.prisma.associateUser.findUniqueOrThrow({
                where: { id }
            });

            return user;
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to find user!");
        }

    }

    async findUserByEmail(email: string): Promise<AssociateUser> {
        try {
            const user = await this.prisma.associateUser.findUnique({
                where: { email }
            });

            return user;
        }
        catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to find user!");
        }
    }

    async findAllUsers(): Promise<AssociateUser[]> {
        try {
            const users = await this.prisma.associateUser.findMany();
            return users;
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to find users!");
        }
    }

    async updateUser(id: number, data: UpdateAssociateUserDto): Promise<AssociateUser> {
        try {
            await this.prisma.associateUser.findUniqueOrThrow({ where: { id } });

            const updatedUser = await this.prisma.associateUser.update({ where: { id }, data });

            return updatedUser;
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to update user!");
        }
    }
    async deleteUser(id: number): Promise<AssociateUser> {
        try {
            await this.prisma.associateUser.findUniqueOrThrow({ where: { id } });

            const deletedUser = await this.prisma.associateUser.delete({ where: { id } });

            return deletedUser;

        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to delete user!");
        }
    }

}