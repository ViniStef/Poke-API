import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../../application/services/pokemon.service';
import {PokemonRepository} from "../../infrastructure/repositories/pokemon.repository";

describe('PokemonController', () => {
    let pokemonController: PokemonController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PokemonController],
            providers: [PokemonService, PokemonRepository],
        }).compile();

        pokemonController = app.get<PokemonController>(PokemonController);
    });

    describe('Testing the getPokemon function', () => {
        it('Should return information about the pokemon', () => {
            expect(pokemonController.getPokemon('psyduck')).toBeDefined();
        });
    });

    describe('Testing the getPokemonsByColor function', () => {
        it('Should return pokemons with the given color', () => {
            expect(pokemonController.getPokemonsByColor('blue')).toBeDefined();
        });
    });

    describe('Testing the getPaginatedPokemons function', () => {
        it('Should return the correct amount of pokemons', () => {
            expect(pokemonController.getPaginatedPokemons('1', '2')).toBeDefined();
        });
    });


});
