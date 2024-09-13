import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

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

    @IsNotEmpty()
    role: Role;

}
