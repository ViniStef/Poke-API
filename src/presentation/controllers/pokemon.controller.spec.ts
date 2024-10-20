import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../../application/services/pokemon.service';
import {PokemonRepository} from "../../infrastructure/repositories/pokemon.repository";

describe('Controller tests', () => {
    let pokemonController: PokemonController;
    let service: PokemonService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PokemonController],
            providers: [{
                provide: PokemonService,
                useValue: {
                    getPokemonByIdOrName: jest.fn().mockResolvedValue({ name: 'bulbasaur', id: 1 }),
                },

            }, PokemonRepository],
        }).compile();

        pokemonController = app.get<PokemonController>(PokemonController);
        service = app.get<PokemonService>(PokemonService);
    });

    test('Should be defined', () => {
        expect(pokemonController).toBeDefined();
    });

    test('Should return a pokemon by name', async () => {
        const pokemon = await pokemonController.getPokemon('bulbasaur');
        expect(pokemon).toEqual({ name: 'bulbasaur', id: 1 });
    });

    test('Should call the service to get a pokemon by name', async () => {
        await pokemonController.getPokemon('bulbasaur');
        expect(service.getPokemonByIdOrName).toHaveBeenCalledWith('bulbasaur');
    });

});
