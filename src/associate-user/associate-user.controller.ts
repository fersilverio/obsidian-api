import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';

@Controller('associate-user')
export class AssociateUserController {

  @Inject(AssociateUserService)
  private associateUserService: AssociateUserService;

  @Post()
  create(@Body() createAssociateUserDto: CreateAssociateUserDto) {
    return this.associateUserService.create(createAssociateUserDto);
  }

  @Get()
  findAll() {
    return this.associateUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associateUserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssociateUserDto: UpdateAssociateUserDto) {
    return this.associateUserService.update(+id, updateAssociateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.associateUserService.remove(+id);
  }
}
