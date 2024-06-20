import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateAssociateUserDto } from "src/associate-user/dto/create-associate-user.dto";
import { PrismaAssociateUserRepository } from "../prisma-associate-user.repository";

describe("Prisma Associate Users Repository Integration Tests", () => {
    let sut: PrismaAssociateUserRepository;
    let prisma = new PrismaClient();
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [PrismaAssociateUserRepository, PrismaClient]
        }).compile();
    });

    beforeEach(async () => {
        sut = new PrismaAssociateUserRepository(prisma as any);
        await prisma.associateUser.deleteMany();
    });

    afterAll(async () => {
        await module.close();
    });

    describe("createUser functionality", () => {
        it("Should create a new user", async () => {
            const data: CreateAssociateUserDto = {
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789"
            }

            const result = await sut.createUser(data);

            expect(result).toBeDefined();
        });
    });

});