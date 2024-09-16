import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../enums/roles";

export class CreateAssociateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({ example: "John Doe", required: true })
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({ example: "Johnny Doe", required: true })
    nick_name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: "exemple@example.com", required: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ example: "a-desired-password", required: true })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role;

}
