import { CreateAssociateUserDto } from "src/associate-user/dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "src/associate-user/dto/update-associate-user.dto";
import { AssociateUser } from "src/associate-user/entities/associate-user.entity";
import { AssociateUsersRepository } from "../associate-users.repository";
import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";

export class PrismaAssociateUserRepository implements AssociateUsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        const user = await this.prisma.associateUser.create({ data });

        return user;
    }
    findUserById(id: string): Promise<AssociateUser> {
        throw new Error("Method not implemented.");
    }
    findAllUsers(): Promise<AssociateUser[]> {
        throw new Error("Method not implemented.");
    }
    updateUser(id: string, data: UpdateAssociateUserDto): Promise<AssociateUser> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<AssociateUser> {
        throw new Error("Method not implemented.");
    }

}