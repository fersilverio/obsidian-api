import { AssociateUser } from "src/associate-user/entities/associate-user.entity";
import { AssociateUsersRepository } from "../associate-users.repository";
import { CreateAssociateUserDto } from "src/associate-user/dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "src/associate-user/dto/update-associate-user.dto";


export class InMemoryAssociateUsersRepository implements AssociateUsersRepository {
    users: AssociateUser[] = [];

    async createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        if (!data) {
            throw new Error("No data provided!");
        }

        const user: AssociateUser = {
            id: this.users.length + 1,
            name: data.name,
            nick_name: data.nick_name,
            email: data.email,
            password: data.password,
            level: 0,
            rank: 0,
            clan: "",
            number_of_cards: 0,
            create_date: new Date(),
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
            nick_name: data.nick_name,
            email: data.email,
            password: data.password,
            level: data.level,
            rank: data.rank,
            clan: data.clan,
            number_of_cards: data.number_of_cards,
            update_date: data.update_date,
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