import { Inject } from '@nestjs/common';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';
import { AssociateUser } from './entities/associate-user.entity';
import { AssociateUsersRepository } from './repositories/associate-users.repository';


export class AssociateUserService {

  @Inject("AssociateUsersRepository")
  private associateUserRepository: AssociateUsersRepository;


  async create(dto: CreateAssociateUserDto): Promise<AssociateUser> {
    return await this.associateUserRepository.createUser(dto);
  }

  async findAll() {
    return await this.associateUserRepository.findAllUsers();
  }

  async findOne(id: number) {
    return await this.associateUserRepository.findUserById(id);
  }

  async findOneByEmail(email: string) {
    return await this.associateUserRepository.findUserByEmail(email);
  }

  async update(id: number, updateAssociateUserDto: UpdateAssociateUserDto) {
    return this.associateUserRepository.updateUser(id, updateAssociateUserDto);
  }

  async remove(id: number) {
    return this.associateUserRepository.deleteUser(id);
  }
}
