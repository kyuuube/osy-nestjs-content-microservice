// import {IsNotEmpty } from 'class-validator'
export class PaginationDto {
    public readonly page: number
    public readonly pageSize: number
    public readonly keywords?: string
}
