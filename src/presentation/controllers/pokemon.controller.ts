import {Controller, Get, Param, Query} from '@nestjs/common';
import { PokemonService } from '../../application/services/pokemon.service';
import { Pokemon } from '../../domain/entities/pokemon.entity';

@Controller()
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get('pokemon/:idOrName')
    getPokemon(@Param('idOrName') pokemonParam: string): Promise<Pokemon> {
        return this.pokemonService.getPokemonByIdOrName(pokemonParam);
    }

    @Get('pokemon-color/:color')
    getPokemonsByColor(@Param('color') colorParam: string): Promise<Pokemon[]> {
        return this.pokemonService.getPokemonsByColor(colorParam);
    }

    @Get('pokemon')
    getPaginatedPokemons(@Query('limit') @Query('offset') limit: string,  offset: string): Promise<Pokemon[]> {
        return this.pokemonService.getPaginatedPokemons(limit, offset);
    }
}
