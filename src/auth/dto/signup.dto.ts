import { IsString, IsNotEmpty, MaxLength, IsEmail, MinLength } from "class-validator";
import { Role } from "src/associate-user/enums/roles";

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nick_name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    role: Role;
}
