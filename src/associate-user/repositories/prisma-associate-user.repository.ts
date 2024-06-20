import { CreateAssociateUserDto } from "src/associate-user/dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "src/associate-user/dto/update-associate-user.dto";
import { AssociateUser } from "src/associate-user/entities/associate-user.entity";
import { PrismaService } from "src/prisma.service";
import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";
import { AssociateUsersRepository } from "./associate-users.repository";

export class PrismaAssociateUserRepository implements AssociateUsersRepository {
    private logger = new Logger(PrismaAssociateUserRepository.name);

    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        try {
            const user = await this.prisma.associateUser.create({ data });
            return user;
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Could not create user!");
        }
    }
    async findUserById(id: number): Promise<AssociateUser> {
        try {
            if (!id) {
                throw new BadRequestException("No id provided!");
            }

            const user = await this.prisma.associateUser.findUnique({
                where: { id: +id }
            });

            return user;
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to find user!");
        }

    }

    async findUserByEmail(email: string): Promise<AssociateUser> {
        try {
            if (!email) {
                throw new BadRequestException("No email provided!");
            }

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
            if (!id) {
                throw new BadRequestException("No id provided!");
            }

            if (!data) {
                throw new BadRequestException("No data provided!");
            }

            const updatedUser = await this.prisma.associateUser.update({ where: { id: + id }, data })
            return updatedUser;
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to update user!");
        }
    }
    async deleteUser(id: number): Promise<AssociateUser> {
        try {
            if (!id) {
                throw new BadRequestException("No id provided!");
            }

            const deletedUser = await this.prisma.associateUser.delete({ where: { id: + id } });
            return deletedUser;

        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException("Unable to delete user!");
        }
    }

}