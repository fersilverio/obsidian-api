import { CreateAssociateUserDto } from "../dto/create-associate-user.dto";
import { UpdateAssociateUserDto } from "../dto/update-associate-user.dto";
import { AssociateUser } from "../entities/associate-user.entity";

export interface AssociateUsersRepository {
    createUser(data: CreateAssociateUserDto): Promise<AssociateUser>;
    findUserById(id: number): Promise<AssociateUser>;
    findUserByEmail(email: string): Promise<AssociateUser>;
    findAllUsers(): Promise<AssociateUser[]>;
    updateUser(id: number, data: UpdateAssociateUserDto): Promise<AssociateUser>;
    deleteUser(id: number): Promise<AssociateUser>;
}