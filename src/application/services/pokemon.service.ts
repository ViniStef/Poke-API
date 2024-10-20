import { Injectable } from '@nestjs/common';
import { Pokemon } from '../../domain/entities/pokemon.entity';
import {PokemonRepository} from "../../infrastructure/repositories/pokemon.repository";

@Injectable()
export class PokemonService {
    constructor(private readonly pokemonRepository: PokemonRepository) {}

     async getPokemonByIdOrName(pokemonParam: string): Promise<Pokemon> {
        const id = Number(pokemonParam);

        if (!isNaN(id)) {
            return await this.pokemonRepository.findByIdOrName(id, undefined);
        } else {
            return await this.pokemonRepository.findByIdOrName(undefined, pokemonParam);
        }
    }

    async getPokemonsByColor(colorParam: string): Promise<Pokemon[]> {
        return await this.pokemonRepository.findByColor(colorParam);
    }

    async getPaginatedPokemons(limit: string, offset: string): Promise<Pokemon[]> {
        const limitConverted = Number(limit);
        const offsetConverted = Number(offset);

        return await this.pokemonRepository.findPaginated(limitConverted, offsetConverted);
    }

}