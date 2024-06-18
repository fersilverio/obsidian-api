import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger, BadRequestException } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';

@Controller('associate-user')
export class AssociateUserController {
  private logger = new Logger(AssociateUserController.name);

  @Inject(AssociateUserService)
  private associateUserService: AssociateUserService;

  @Post()
  create(@Body() createAssociateUserDto: CreateAssociateUserDto) {
    try {
      return this.associateUserService.create(createAssociateUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err.message);
    }

  }

  @Get()
  findAll() {
    try {
      return this.associateUserService.findAll();
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.associateUserService.findOne(id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssociateUserDto: UpdateAssociateUserDto) {
    try {
      return this.associateUserService.update(+id, updateAssociateUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.associateUserService.remove(+id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(err.message);
    }
  }
}
