import { BadRequestException, Inject } from '@nestjs/common';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';
import { AssociateUser } from './entities/associate-user.entity';
import { AssociateUsersRepository } from './repositories/associate-users.repository';


export class AssociateUserService {

  @Inject("AssociateUsersRepository")
  private associateUserRepository: AssociateUsersRepository;


  async create(dto: CreateAssociateUserDto): Promise<AssociateUser> {
    const user = await this.associateUserRepository.createUser(dto);
    return user;
  }

  async findAll() {
    return await this.associateUserRepository.findAllUsers();
  }

  async findOne(id: number) {
    return await this.associateUserRepository.findUserById(id);
  }

  update(id: number, updateAssociateUserDto: UpdateAssociateUserDto) {
    return this.associateUserRepository.updateUser(id, updateAssociateUserDto);
  }

  remove(id: number) {
    return this.associateUserRepository.deleteUser(id);
  }
}
