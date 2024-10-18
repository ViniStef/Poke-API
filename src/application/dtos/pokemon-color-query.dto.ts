import { IsString, IsOptional,ValidateIf, IsNotEmpty } from 'class-validator';

export class PokemonColorQueryDto {
    @ValidateIf(obj => !obj.color)
    @IsString()
    @IsOptional()
    id?: number;

    @ValidateIf(obj => !obj.id)
    @IsString()
    @IsOptional()
    color?: string;

    @IsNotEmpty({ message: 'At least one of id or color must be provided' })
    validateAtLeastOne() {
        return this.id || this.color;
    }
}