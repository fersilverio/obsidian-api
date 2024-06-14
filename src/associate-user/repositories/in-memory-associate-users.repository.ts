import { CreateAssociateUserDto } from "../dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "../dto/update-associate-user.dto";
import { AssociateUser } from "../entities/associate-user.entity";
import { AssociateUsersRepository } from "./associate-users.repository";

export class InMemoryAssociateUsersRepository implements AssociateUsersRepository {
    items: AssociateUser[] = [];

    async createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        if (!data) {
            throw new Error("No data provided!");
        }

        const user: AssociateUser = {
            id: this.items.length + 1,
            name: data.name,
            email: data.email,
            password: data.password,
            level: 0,
            rank: 0,
            clan: "",
            numberOfCards: 0,
            createdAt: new Date(),
        }

        this.items.push(user);

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