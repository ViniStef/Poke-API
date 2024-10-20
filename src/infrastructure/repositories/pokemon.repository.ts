import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import axios, {AxiosError} from 'axios';
import {IPokemonRepository} from '../../domain/repositories/ipokemon.repository';
import {Pokemon} from '../../domain/entities/pokemon.entity';
import {PokemonColorInfo} from "../../domain/entities/pokemon-color.entity";
import {PokemonPaginated} from "../../domain/entities/pokemon-paginated.entity";

@Injectable()
export class PokemonRepository implements IPokemonRepository {
    async findByIdOrName(id: number, name: string): Promise<Pokemon> {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id ?? name}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error.response?.status === 500) {
                throw new InternalServerErrorException(
                    {
                        message: "Internal server error, sorry for the inconvenience",
                        status: 500
                    });
            } else {
                throw error;
            }
        }
    }

    async findByColor(colorParam: string): Promise<PokemonColorInfo> {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon-color/${colorParam}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error.response?.status === 500) {
                throw new InternalServerErrorException(
                    {
                        message: "Internal server error, sorry for the inconvenience",
                        status: 500
                    });
            } else {
                throw error;
            }
        }

    }

    async findPaginated(limit: number, offset: number): Promise<PokemonPaginated> {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error.response?.status === 500) {
                throw new InternalServerErrorException(
                    {
                        message: "Internal server error, sorry for the inconvenience",
                        status: 500
                    });
            } else {
                throw error;
            }
        }
    }
}