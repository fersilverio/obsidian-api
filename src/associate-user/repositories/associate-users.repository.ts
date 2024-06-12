import { CreateAssociateUserDto } from "../dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "../dto/update-associate-user.dto";
import { AssociateUser } from "../entities/associate-user.entity";

export interface AssociateUsersRepository {
    createUser(data: CreateAssociateUserDto): Promise<AssociateUser>;
    findUserById(id: string): Promise<AssociateUser>;
    findAllUsers(): Promise<AssociateUser[]>;
    updateUser(id: string, data: UpdateAssociateUserDto): Promise<AssociateUser>;
    deleteUser(id: string): Promise<AssociateUser>;
}