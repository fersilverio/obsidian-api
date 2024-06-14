import { InMemoryAssociateUsersRepository } from "../in-memory-associate-users.repository";

describe("InMemoryAssociateUsersRepository unit tests", () => {
    let sut: InMemoryAssociateUsersRepository;

    beforeEach(() => {
        sut = new InMemoryAssociateUsersRepository();
    });

    it("Should fail when attempt to create an user without data", () => {
        expect(sut.createUser(null)).rejects.toThrow("No data provided!");
    });
})