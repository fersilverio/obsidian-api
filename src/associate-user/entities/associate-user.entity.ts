import { ApiProperty } from "@nestjs/swagger";

export class AssociateUser {
    @ApiProperty({ example: 1 })
    id: number;
    @ApiProperty({ example: "John Doe" })
    name: string;
    @ApiProperty({ example: "Jhonny Doe" })
    nick_name: string;
    @ApiProperty({ example: "exemple@example.com" })
    email: string;
    @ApiProperty({ example: "a hashed password" })
    password: string;
    @ApiProperty({ example: null })
    level?: number;
    @ApiProperty({ example: null })
    rank?: number;
    @ApiProperty({ example: null })
    clan?: string;
    @ApiProperty({ example: 0 })
    number_of_cards?: number;
    @ApiProperty({ example: "2024-02-10 23:45:03" })
    create_date?: Date;
    @ApiProperty({ example: "2024-02-10 23:45:03" })
    update_date?: Date;
}
