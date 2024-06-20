import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class SiginDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    password: string;
}