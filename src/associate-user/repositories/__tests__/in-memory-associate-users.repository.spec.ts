import { InMemoryAssociateUsersRepository } from "../in-memory-associate-users.repository";

describe("InMemoryAssociateUsersRepository unit tests", () => {
    let sut: InMemoryAssociateUsersRepository;

    beforeEach(() => {
        sut = new InMemoryAssociateUsersRepository();
    });

    describe("createUser functionality", () => {
        it("Should fail when attempt to create an user without data", () => {
            expect(sut.createUser(null)).rejects.toThrow("No data provided!");
        });

        it("Should create an user", async () => {
            const user = await sut.createUser({
                name: "test",
                email: "test@example.com",
                password: "1234567",
                nick_name: "test-nick"
            });

            expect(user).toMatchObject({
                id: expect.any(Number),
                name: "test",
                email: "test@example.com",
                password: "1234567",
                nick_name: "test-nick"
            })
        })
    });

    describe("findUserById functionality", () => {
        it("Should fail whern attempt to find an user without an id", async () => {
            expect(sut.findUserById(null)).rejects.toThrow("No id provided!");
        });

        it("Should return an user with given id", async () => {
            const user = await sut.createUser({
                name: "test",
                email: "test@example.com",
                password: "1234567",
                nick_name: "test-nick"
            });

            const foundUser = await sut.findUserById(user.id);

            expect(foundUser).toMatchObject(user);
        });

        it("Should fail when attempt to find an user that does not exist", async () => {
            expect(sut.findUserById((sut.users.length + 1))).rejects.toThrow("User not found!");
        });
    });

    describe("findAllUsers functionality", () => {
        it("Should retrieve all users", async () => {
            for (let i = 0; i < 3; i++) {
                const user = await sut.createUser({
                    name: `test ${i}`,
                    email: "test@example.com",
                    password: "1234567",
                    nick_name: "test-nick"
                });
            }

            const result = await sut.findAllUsers();


            expect(result).toHaveLength(3)
        })
    });

    describe("updateUser functionality", () => {
        it("Should fail when attempt to update an user without an id", async () => {
            expect(sut.updateUser(null, {
                name: "test",
                email: "test@example.com",
                password: "1234567"
            })).rejects.toThrow("No id provided!");
        });

        it("Should fail when attempt to update an user without data", async () => {
            expect(sut.updateUser(1, null)).rejects.toThrow("No data provided!");
        });

        it("Should update an user with given id and data correctly", async () => {
            const user = await sut.createUser({
                name: "test",
                email: "test@example.com",
                password: "1234567",
                nick_name: "test-nick"
            });

            const updatedUser = await sut.updateUser(user.id, {
                name: "test",
                email: "test@example.com",
                password: "1234567",
                level: 1,
                rank: 1,
                clan: "test",
                number_of_cards: 1,
                update_date: new Date()
            });

            expect(updatedUser).toMatchObject({
                id: user.id,
                name: "test",
                email: "test@example.com",
                password: "1234567",
                level: 1,
                rank: 1,
                clan: "test",
                number_of_cards: 1,
                update_date: new Date()
            });
        });
    });

    describe("deleteUser functionality", () => {
        it("Should fail when attempt to delete an user without an id", async () => {
            expect(sut.deleteUser(null)).rejects.toThrow("No id provided!");
        });

        it("Should delete an user with given id", async () => {
            const user = await sut.createUser({
                name: "test",
                email: "test@example.com",
                password: "1234567",
                nick_name: "test-nick"
            });

            await sut.deleteUser(user.id);

            expect(sut.users).toHaveLength(0);
        });

        it("Should fail when attempt to delete an user that does not exist", async () => {
            const user = await sut.createUser({
                name: "test",
                email: "test@example.com",
                password: "1234567",
                nick_name: "test-nick"
            });

            await expect(sut.deleteUser((sut.users.length + 1))).rejects.toThrow("User not found!");
        });
    });
})