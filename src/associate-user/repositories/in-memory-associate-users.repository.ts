import { CreateAssociateUserDto } from "../dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "../dto/update-associate-user.dto";
import { AssociateUser } from "../entities/associate-user.entity";
import { AssociateUsersRepository } from "./associate-users.repository";

export class InMemoryAssociateUsersRepository implements AssociateUsersRepository {
    users: AssociateUser[] = [];

    async createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        if (!data) {
            throw new Error("No data provided!");
        }

        const user: AssociateUser = {
            id: this.users.length + 1,
            name: data.name,
            email: data.email,
            password: data.password,
            level: 0,
            rank: 0,
            clan: "",
            numberOfCards: 0,
            createdAt: new Date(),
        }

        this.users.push(user);

        return user;
    }
    async findUserById(id: string): Promise<AssociateUser> {
        if (!id) {
            throw new Error("No id provided!");
        }

        const user = this.users.find(user => user.id === +id);

        if (!user) {
            throw new Error("User not found!");
        }

        return user;
    }
    async findAllUsers(): Promise<AssociateUser[]> {
        return this.users;
    }
    async updateUser(id: string, data: UpdateAssociateUserDto): Promise<AssociateUser> {
        if (!id) {
            throw new Error("No id provided!");
        }

        if (!data) {
            throw new Error("No data provided!");
        }

        const userIndex = this.users.findIndex(user => user.id === +id);

        this.users[userIndex] = {
            id: +id,
            name: data.name,
            email: data.email,
            password: data.password,
            level: data.level,
            rank: data.rank,
            clan: data.clan,
            numberOfCards: data.numberOfCards,
            updatedAt: data.updatedAt,
        };

        return this.users[userIndex];


    }
    async deleteUser(id: string): Promise<AssociateUser> {
        if (!id) {
            throw new Error("No id provided!");
        }

        const index = this.users.findIndex(user => user.id === +id);

        if (!this.users[index]) {
            throw new Error("User not found!");
        }

        this.users.splice(index, 1);

        return this.users[index];
    }

}