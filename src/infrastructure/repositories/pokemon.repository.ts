import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IPokemonRepository } from '../../domain/repositories/ipokemon.repository';
import { Pokemon } from '../../domain/entities/pokemon.entity';

@Injectable()
export class PokemonRepository implements IPokemonRepository {
    async findByIdOrName(id: number, name: string): Promise<Pokemon> {
        const url = `https://pokeapi.co/api/v2/pokemon/${id ?? name}`;
        const response = await axios.get<Pokemon>(url);
        return response.data;
    }

    async findByColor(colorParam: string): Promise<Pokemon[]> {
        const url = `https://pokeapi.co/api/v2/pokemon-color/${colorParam}`;
        const response = await axios.get(url);
        return response.data;
    }

    async findPaginated(limit: number, offset: number): Promise<Pokemon[]> {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        const response = await axios.get(url);
        return response.data;
    }
}