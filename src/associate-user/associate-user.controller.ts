import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger, BadRequestException, UsePipes, ValidationPipe, UseGuards, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';
import { TransformPasswordPipe } from 'src/auth/pipes/transform-password.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssociateUser } from './entities/associate-user.entity';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from './enums/roles';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('associate-user')
@ApiTags("Associate User")
@UseGuards(AuthGuard, RoleGuard)
export class AssociateUserController {
  @Inject(AssociateUserService)
  private associateUserService: AssociateUserService;

  @Post()
  @ApiOperation({ summary: "Creates a new associated user" })
  @ApiCreatedResponse({ status: 201, description: "Created", type: AssociateUser })
  @ApiBadRequestResponse({ status: 400, description: "Could not access create functionality" })
  @UsePipes(ValidationPipe, TransformPasswordPipe)
  @Roles(Role.Admin)
  create(@Body() createAssociateUserDto: CreateAssociateUserDto): Promise<AssociateUser> {
    return this.associateUserService.create(createAssociateUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieves all associated users" })
  @ApiOkResponse({ status: 200, description: "Success", isArray: true, type: AssociateUser })
  @ApiBadRequestResponse({ status: 400, description: "Could not access findAll functionality" })
  findAll() {
    return this.associateUserService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Retrieves an associated user by id" })
  @ApiOkResponse({ status: 200, description: "Success", type: AssociateUser })
  @ApiBadRequestResponse({ status: 400, description: "Could not access findOne functionality" })
  findOne(@Param('id') id: string) {
    return this.associateUserService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Updated an associated user" })
  @ApiOkResponse({ status: 200, description: "Success", type: AssociateUser })
  @ApiBadRequestResponse({ status: 400, description: "Could not access update functionality" })
  update(@Param('id') id: string, @Body() updateAssociateUserDto: UpdateAssociateUserDto) {
    return this.associateUserService.update(+id, updateAssociateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes an associated user" })
  @ApiOkResponse({ status: 200, description: "Success", type: AssociateUser })
  @ApiBadRequestResponse({ status: 400, description: "Could not access delete functionality" })
  remove(@Param('id') id: string) {
    return this.associateUserService.remove(+id);
  }
}
