import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';
import { AssociateUser } from './entities/associate-user.entity';
import { AssociateUsersRepository } from './repositories/associate-users.repository';


export class AssociateUserService {

  @Inject("AssociateUsersRepository")
  private associateUserRepository: AssociateUsersRepository;

  //constructor(private readonly associateUserRepository: AssociateUsersRepository) { }


  async create(dto: CreateAssociateUserDto): Promise<AssociateUser> {
    if (!dto) {
      throw new BadRequestException("No data provided to create an user.");
    }

    const user = await this.associateUserRepository.createUser(dto);

    return user;
  }

  findAll() {
    return `This action returns all associateUser`;
  }

  async findOne(id: string) {
    return await this.associateUserRepository.findUserById(id);
  }

  update(id: number, updateAssociateUserDto: UpdateAssociateUserDto) {
    return `This action updates a #${id} associateUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} associateUser`;
  }
}
