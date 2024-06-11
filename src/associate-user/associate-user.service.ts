import { Injectable } from '@nestjs/common';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';

@Injectable()
export class AssociateUserService {
  create(createAssociateUserDto: CreateAssociateUserDto) {
    return 'This action adds a new associateUser';
  }

  findAll() {
    return `This action returns all associateUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} associateUser`;
  }

  update(id: number, updateAssociateUserDto: UpdateAssociateUserDto) {
    return `This action updates a #${id} associateUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} associateUser`;
  }
}
