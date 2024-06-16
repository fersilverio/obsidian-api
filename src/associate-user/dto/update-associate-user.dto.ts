import { PartialType } from '@nestjs/mapped-types';
import { CreateAssociateUserDto } from './create-associate-user.dto';

export class UpdateAssociateUserDto extends PartialType(CreateAssociateUserDto) {
    level?: number;
    rank?: number;
    clan?: string;
    number_of_cards?: number;
    update_date?: Date;
}
