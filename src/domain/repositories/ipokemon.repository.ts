import { Pokemon } from '../entities/pokemon.entity';
import {PokemonColorInfo} from "../entities/pokemon-color.entity";
import {PokemonPaginated} from "../entities/pokemon-paginated.entity";

export interface IPokemonRepository {
    findByIdOrName(id?: number, name?: string): Promise<Pokemon>;
    findByColor(color: string): Promise<PokemonColorInfo>;
    findPaginated(limit: number, offset: number): Promise<PokemonPaginated>;
}