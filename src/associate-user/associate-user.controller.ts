import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssociateUserService } from './associate-user.service';
import { CreateAssociateUserDto } from './dto/create-associate-user.dto';
import { UpdateAssociateUserDto } from './dto/update-associate-user.dto';
import { TransformPasswordPipe } from 'src/auth/pipes/transform-password.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssociateUser } from './entities/associate-user.entity';

@Controller('associate-user')
@ApiTags("Associate User")
export class AssociateUserController {
  private logger = new Logger(AssociateUserController.name);

  @Inject(AssociateUserService)
  private associateUserService: AssociateUserService;

  @Post()
  @ApiOperation({ summary: "Creates a new associated user" })
  @ApiCreatedResponse({ status: 201, description: "Created", type: AssociateUser })
  @ApiBadRequestResponse({ status: 400, description: "Bad request" })
  @ApiInternalServerErrorResponse()
  @UsePipes(ValidationPipe, TransformPasswordPipe)
  create(@Body() createAssociateUserDto: CreateAssociateUserDto): Promise<AssociateUser> {
    try {
      return this.associateUserService.create(createAssociateUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access create functionality");
    }

  }

  @Get()
  @ApiOperation({ summary: "Retrieves all associated users" })
  findAll() {
    try {
      return this.associateUserService.findAll();
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access findAll functionality");
    }
  }

  @Get(':id')
  @ApiOperation({ summary: "Retrieves an associated user by id" })
  findOne(@Param('id') id: string) {
    try {
      return this.associateUserService.findOne(+id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access findOne functionality");
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: "Updated an associated user" })
  update(@Param('id') id: string, @Body() updateAssociateUserDto: UpdateAssociateUserDto) {
    try {
      return this.associateUserService.update(+id, updateAssociateUserDto);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access update functionality");
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes an associated user" })
  remove(@Param('id') id: string) {
    try {
      return this.associateUserService.remove(+id);
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException("Could not access delete functionality");
    }
  }
}
