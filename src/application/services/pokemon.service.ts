import { Injectable } from '@nestjs/common';
import { IPokemonRepository } from '../../domain/repositories/ipokemon.repository';
import { Pokemon } from '../../domain/entities/pokemon.entity';

@Injectable()
export class PokemonService {
    constructor(private readonly pokemonRepository: IPokemonRepository) {}

    async getPokemonByIdOrName(id?: number, name?: string): Promise<Pokemon> {
        return this.pokemonRepository.findByIdOrName(id, name);
    }
}