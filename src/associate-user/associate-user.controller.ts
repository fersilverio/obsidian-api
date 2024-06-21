import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';
import { TransformPasswordPipe } from 'src/auth/pipes/transform-password.pipe';

@Controller('associate-user')
export class AssociateUserController {
  private logger = new Logger(AssociateUserController.name);

  @Inject(AssociateUserService)
  private associateUserService: AssociateUserService;

  @Post()
  @UsePipes(ValidationPipe, TransformPasswordPipe)
  create(@Body() createAssociateUserDto: CreateAssociateUserDto) {
    try {
      return this.associateUserService.create(createAssociateUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access create functionality");
    }

  }

  @Get()
  findAll() {
    try {
      return this.associateUserService.findAll();
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access findAll functionality");
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.associateUserService.findOne(+id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access findOne functionality");
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssociateUserDto: UpdateAssociateUserDto) {
    try {
      return this.associateUserService.update(+id, updateAssociateUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access update functionality");
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.associateUserService.remove(+id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access delete functionality");
    }
  }
}
