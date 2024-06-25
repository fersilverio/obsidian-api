import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class SiginDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({ example: "example@example.com" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @ApiProperty({ example: "an-user-password" })
    password: string;
}