import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateAssociateUserDto } from "src/associate-user/dto/create-associate-user.dto";
import { PrismaAssociateUserRepository } from "../prisma/prisma-associate-user.repository";
import { Role } from "../../enums/roles";

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
        it("Should create a new common user", async () => {
            const data: CreateAssociateUserDto = {
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            }

            const result = await sut.createUser(data);

            expect(result).toBeDefined();
            expect(result).toMatchObject({
                id: result.id,
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                level: null,
                rank: null,
                clan: null,
                number_of_cards: 0,
                role: Role.User,
                create_date: expect.any(Date),
                update_date: expect.any(Date),
            });

            await prisma.associateUser.delete({ where: { id: result.id } });
        });

        it("Should create a new admin user", async () => {
            const data: CreateAssociateUserDto = {
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: Role.Admin,
            }

            const result = await sut.createUser(data);

            expect(result).toBeDefined();
            expect(result).toMatchObject({
                id: result.id,
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                level: null,
                rank: null,
                clan: null,
                number_of_cards: 0,
                role: Role.Admin,
                create_date: expect.any(Date),
                update_date: expect.any(Date),
            });

            await prisma.associateUser.delete({ where: { id: result.id } });
        });
    });

    describe("findUserById functionality", () => {
        it("Should fail when attempt to find an user without and provided id", async () => {
            await expect(sut.findUserById(null)).rejects.toThrow(new BadRequestException("Unable to find user!"));
        });

        it("Should retrieve an user by its id", async () => {
            const data: CreateAssociateUserDto = {
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            }
            const createdUser = await sut.createUser(data);

            await expect(sut.findUserById(createdUser.id)).resolves.toMatchObject({
                id: createdUser.id,
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                level: null,
                rank: null,
                clan: null,
                number_of_cards: 0,
                create_date: expect.any(Date),
                update_date: expect.any(Date),
            });


        });
    });

    describe("findUserByEmail functionality", () => {
        it("Should fail when attempt to find an user without a provided email", async () => {
            const email = null;

            await expect(sut.findUserByEmail(email)).rejects.toThrow(new InternalServerErrorException("Unable to find user!"));
        });

        it("Should retrieve an user by its email", async () => {
            const data: CreateAssociateUserDto = {
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            }
            const createdUser = await sut.createUser(data);

            await expect(sut.findUserByEmail(createdUser.email)).resolves.toMatchObject({
                id: createdUser.id,
                name: "Test",
                nick_name: "Little T",
                email: createdUser.email,
                password: "123456789",
                level: null,
                rank: null,
                clan: null,
                number_of_cards: 0,
                create_date: expect.any(Date),
                update_date: expect.any(Date),
            });


        });
    });

    describe("findAllUsers functionality", () => {
        it("Should retrieve all users", async () => {
            for (let i = 0; i < 5; i++) {
                const data: CreateAssociateUserDto = {
                    name: "Test",
                    nick_name: "Little T",
                    email: `test${i}@test.com`,
                    password: "123456789",
                    role: null
                }

                await sut.createUser(data);
            }

            const users = await sut.findAllUsers();

            expect(users.length).toBe(5);
        });
    });


    describe("updateUser functionality", () => {
        it("Should fail when attempt to update an user without data", async () => {
            await sut.createUser({
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            });

            const id = await prisma.associateUser.aggregate({
                _max: { id: true },
            })
            const data = null;

            await expect(sut.updateUser(id._max.id, data)).rejects.toThrow(new InternalServerErrorException("Unable to update user!"));
        });

        it("Should fail when attempt to update an user without id", async () => {
            await sut.createUser({
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            });

            const id = null;
            const data = {
                nick_name: "Nick Just for Test",
            };

            await expect(sut.updateUser(id, data)).rejects.toThrow(new InternalServerErrorException("Unable to update user!"));
        });

        it("Should update an user", async () => {
            const data: CreateAssociateUserDto = {
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            }
            const createdUser = await sut.createUser(data);

            const id = createdUser.id;
            const updateData = {
                nick_name: "Nick Just for Test",
            };

            const updatedUser = await sut.updateUser(id, updateData);

            expect(updatedUser).toBeDefined();
            expect(updatedUser.nick_name).toEqual(updateData.nick_name);
            expect(updatedUser).toMatchObject({
                id: createdUser.id,
                name: data.name,
                nick_name: updateData.nick_name,
                email: data.email,
                password: data.password,
                level: createdUser.level,
                rank: createdUser.rank,
                clan: createdUser.clan,
                number_of_cards: createdUser.number_of_cards,
                create_date: expect.any(Date),
                update_date: expect.any(Date),
            });

        });
    });

    describe("deleteUser functionality", () => {
        it("Should fail when attempt to update an user without id", async () => {
            await sut.createUser({
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            });

            const id = null;

            await expect(sut.deleteUser(id)).rejects.toThrow(new InternalServerErrorException("Unable to delete user!"));
        });

        it("Should delete an user", async () => {
            const data: CreateAssociateUserDto = {
                name: "Test",
                nick_name: "Little T",
                email: "test@test.com",
                password: "123456789",
                role: null
            }
            const createdUser = await sut.createUser(data);

            const id = createdUser.id;

            const deleted = await sut.deleteUser(id);

            expect(deleted).toBeDefined();
            expect(deleted).toMatchObject({
                id: deleted.id,
                name: createdUser.name,
                nick_name: createdUser.nick_name,
                email: createdUser.email,
                password: createdUser.password,
                level: createdUser.level,
                rank: createdUser.rank,
                clan: createdUser.clan,
                number_of_cards: createdUser.number_of_cards,
                create_date: expect.any(Date),
                update_date: expect.any(Date),
            });

        });
    });

});