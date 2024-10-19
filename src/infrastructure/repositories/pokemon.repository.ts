import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IPokemonRepository } from '../../domain/repositories/ipokemon.repository';
import { Pokemon } from '../../domain/entities/pokemon.entity';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
    async findByIdOrName(id?: number, name?: string): Promise<Pokemon> {
        const url = `https://pokeapi.co/api/v2/pokemon/${id ?? name}`;
        const response = await axios.get<Pokemon>(url);
        return response.data;
    }

    async findByColor(color: string): Promise<Pokemon[]> {
        const url = `https://pokeapi.co/api/v2/pokemon-color/${color}`;
        const response = await axios.get(url);
        return response.data.pokemon.map(p => p.pokemon);
    }

    async findPaginated(limit: number, offset: number): Promise<Pokemon[]> {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response = await axios.get(url);
        return response.data.results;
    }
}