import { CreateAssociateUserDto } from "../dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "../dto/update-associate-user.dto";
import { AssociateUser } from "../entities/associate-user.entity";
import { AssociateUsersRepository } from "./associate-users.repository";

export class InMemoryAssociateUsersRepository implements AssociateUsersRepository {
    createUser(data: CreateAssociateUserDto): Promise<AssociateUser> {
        throw new Error("Method not implemented.");
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