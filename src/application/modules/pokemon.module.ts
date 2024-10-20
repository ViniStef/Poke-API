import { Module } from '@nestjs/common';
import { PokemonController } from '../../presentation/controllers/pokemon.controller';
import { PokemonService } from '../services/pokemon.service';
import { PokemonRepository } from "../../infrastructure/repositories/pokemon.repository";

@Module({
    controllers: [PokemonController],
    providers: [PokemonService, PokemonRepository]
})

export class PokemonModule {}
