import { IsString, IsNotEmpty } from 'class-validator'
export class PaginationDto {
    @IsNotEmpty()
    public readonly page: number
    @IsNotEmpty()
    public readonly pageSize: number
    @IsString()
    public readonly keywords: string
}
