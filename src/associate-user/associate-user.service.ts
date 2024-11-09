import { BadRequestException, Inject, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';
import { AssociateUser } from './entities/associate-user.entity';
import { AssociateUsersRepository } from './repositories/associate-users.repository';

export class AssociateUserService {

  @Inject("AssociateUsersRepository")
  private associateUserRepository: AssociateUsersRepository;

  private logger = new Logger(AssociateUserService.name);

  async create(dto: CreateAssociateUserDto): Promise<AssociateUser> {
    try {
      return await this.associateUserRepository.createUser(dto);
    } catch (err) {
      this.logger.error(err, err.cause);
      if (err instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async findAll() {
    try {
      return await this.associateUserRepository.findAllUsers();
    } catch (err) {
      this.logger.error(err);
      if (err instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(err.message);
      }
    }
  }

  async findOne(id: number) {
    try {
      return await this.associateUserRepository.findUserById(id);
    } catch (err) {
      this.logger.error(err, err.cause);
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.associateUserRepository.findUserByEmail(email);
    } catch (err) {
      this.logger.error(err, err.cause);
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
    }
  }

  async update(id: number, updateAssociateUserDto: UpdateAssociateUserDto) {
    try {
      return this.associateUserRepository.updateUser(id, updateAssociateUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access update functionality");
    }
  }

  async remove(id: number) {
    try {
      return this.associateUserRepository.deleteUser(id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access delete functionality");
    }
  }
}
