import { CreateAssociateUserDto } from "src/associate-user/dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "src/associate-user/dto/update-associate-user.dto";
import { AssociateUser } from "src/associate-user/entities/associate-user.entity";
import { BadRequestException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { AssociateUsersRepository } from "../associate-users.repository";
import { Prisma } from "@prisma/client";
import { sendPrismaErrorMessage } from "./errors/utils";
import { PrismaService } from "prisma/prisma.service";
import { Role } from "../../enums/roles";

export class PrismaAssociateUserRepository implements AssociateUsersRepository {
    private logger = new Logger(PrismaAssociateUserRepository.name);

    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        const definedRole = data.role ?? Role.User;

        try {
            const user = await this.prisma.associateUser.create({ data: { ...data, role: definedRole } });
            return user;
        } catch (err) {
            let errorMessage = err.message;
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                errorMessage = sendPrismaErrorMessage(err);
                this.logger.error(errorMessage);
            }

            throw new InternalServerErrorException("Could not create user!", {
                cause: `[CAUSE] ${errorMessage}`,
            });
        }
    }
    async findUserById(id: number): Promise<AssociateUser> {
        if (!id) {
            throw new BadRequestException("Unable to find user!", { cause: "[CAUSE] Id was not provided" });
        }

        const user = await this.prisma.associateUser.findUnique({
            where: { id }
        });

        if (!user) {
            throw new NotFoundException("Unable to find user!", { cause: "[CAUSE] Id was not found at database" });
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<AssociateUser> {
        try {
            const user = await this.prisma.associateUser.findUniqueOrThrow({
                where: { email }
            });

            return user;
        }
        catch (err) {
            this.logger.error(err);
            throw new NotFoundException("Unable to find user!", {
                cause: `[CAUSE] ${err.message}`,
            });
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
            throw new NotFoundException("Unable to update user!", {
                cause: `[CAUSE] ${err.message}`,
            });
        }
    }
    async deleteUser(id: number): Promise<AssociateUser> {
        try {
            await this.prisma.associateUser.findUniqueOrThrow({ where: { id } });

            const deletedUser = await this.prisma.associateUser.delete({ where: { id } });

            return deletedUser;

        } catch (err) {
            this.logger.error(err);
            throw new NotFoundException("Unable to delete user!", {
                cause: `[CAUSE] ${err.message}`,
            });
        }
    }

}