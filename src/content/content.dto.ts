import { IsString, IsNotEmpty } from 'class-validator'
export class ContentDto {
    public id: string
    @IsString()
    @IsNotEmpty()
    public readonly title: string
    @IsString()
    public readonly content: string
}
