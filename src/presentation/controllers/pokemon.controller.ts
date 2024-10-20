import {Controller, Get, HttpCode, Param, Query} from '@nestjs/common';

import {PokemonService} from '../../application/services/pokemon.service';
import {PokemonDto} from "../../application/dtos/pokemon.dto";
import {PokemonColorInfoDto} from "../../application/dtos/pokemon-color.dto";
import {PokemonPaginatedDto} from "../../application/dtos/pokemon-paginated.dto";

@Controller()
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {
    }

    @Get('pokemon/:idOrName')
    getPokemon(@Param('idOrName') pokemonParam: string): Promise<PokemonDto> {
        return this.pokemonService.getPokemonByIdOrName(pokemonParam);
    }

    @Get('pokemon-color/:color')
    getPokemonsByColor(@Param('color') colorParam: string): Promise<PokemonColorInfoDto> {
        return this.pokemonService.getPokemonsAndColorInfoByColor(colorParam);
    }

    @Get('pokemon')
    getPaginatedPokemons(@Query('limit') @Query('offset') limit: string, offset: string): Promise<PokemonPaginatedDto> {
        return this.pokemonService.getPaginatedPokemons(limit, offset);
    }
}
