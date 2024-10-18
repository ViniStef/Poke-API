import { IsInt } from 'class-validator';

export class PaginatedPokemonDto {
    @IsInt()
    limit: number;

    @IsInt()
    offset: number;
}