import { Pokemon } from '../entities/pokemon.entity';

export interface IPokemonRepository {
    findByIdOrName(id?: number, name?: string): Promise<Pokemon>;
    findByColor(color: string): Promise<Pokemon[]>;
    findPaginated(limit: number, offset: number): Promise<Pokemon[]>;
}