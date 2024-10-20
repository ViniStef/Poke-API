import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {Pokemon} from '../../domain/entities/pokemon.entity';
import {PokemonRepository} from "../../infrastructure/repositories/pokemon.repository";
import {PokemonColorInfo} from "../../domain/entities/pokemon-color.entity";
import {PokemonPaginated} from "../../domain/entities/pokemon-paginated.entity";
import {AxiosError} from "axios";

@Injectable()
export class PokemonService {
    constructor(private readonly pokemonRepository: PokemonRepository) {
    }

    async getPokemonByIdOrName(pokemonParam: string): Promise<Pokemon> {
        const id = Number(pokemonParam);
        if (id < 0) {
            throw new BadRequestException({
                message: "The Pokemon ID cannot be negative.",
                status: 400
            })
        }
        try {
            if (!isNaN(id)) {
                return await this.pokemonRepository.findByIdOrName(id, undefined);
            }

            return await this.pokemonRepository.findByIdOrName(undefined, pokemonParam);

        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 404) {
                    throw new NotFoundException(
                        {
                            message: "Pokemon not found in the PokeAPI, please try with a different id or name.",
                            status: 404
                        });
                } else {
                    throw new InternalServerErrorException(
                        {
                            message: "Unexpected error",
                            status: 500
                        }
                    )
                }
            }
        }
    }

    async getPokemonsAndColorInfoByColor(colorParam: string): Promise<PokemonColorInfo> {
        if (parseInt(colorParam) < 0) {
            throw new BadRequestException({
                message: "The Color ID cannot be negative.",
                status: 400
            })
        }
        try {
            return await this.pokemonRepository.findByColor(colorParam);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status === 404) {
                    throw new NotFoundException(
                        {
                            message: "Color not found in the PokeAPI, please try with a different id or color name.",
                            status: 404
                        });
                } else {
                    throw new InternalServerErrorException(
                        {
                            message: "Unexpected error",
                            status: 500
                        }
                    )
                }
            }
        }
    }

    async getPaginatedPokemons(limit: string, offset: string): Promise<PokemonPaginated> {
        const limitConverted = Number(limit);
        const offsetConverted = Number(offset);

        return await this.pokemonRepository.findPaginated(limitConverted, offsetConverted);
    }

}