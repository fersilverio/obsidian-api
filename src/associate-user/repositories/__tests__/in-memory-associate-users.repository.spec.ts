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
                password: "1234567"
            });

            expect(user).toMatchObject({
                id: expect.any(Number),
                name: "test",
                email: "test@example.com",
                password: "1234567",
                level: expect.any(Number),
                rank: expect.any(Number),
                clan: expect.any(String),
                numberOfCards: expect.any(Number),
                createdAt: expect.any(Date),
            })
        })
    })
})