import { IsString, IsOptional,ValidateIf, IsNotEmpty } from 'class-validator';

export class PokemonQueryDto {
    @ValidateIf(obj => !obj.name_pokemon)
    @IsString()
    @IsOptional()
    id?: number;

    @ValidateIf(obj => !obj.id)
    @IsString()
    @IsOptional()
    name_pokemon?: string;

    @IsNotEmpty({ message: 'At least one of id or name must be provided' })
    validateAtLeastOne() {
        return this.id || this.name_pokemon;
    }
}