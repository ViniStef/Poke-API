import axios from "axios";
import { Test, TestingModule } from '@nestjs/testing';
import {PokemonRepository} from "./pokemon.repository";

describe("Repository tests", () => {
    jest.mock('axios');
    let pokemonRepository: PokemonRepository;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [PokemonRepository],
        }).compile();

        pokemonRepository = app.get<PokemonRepository>(PokemonRepository);
    });

    test("Should be able to successfully get a pokemon by name", async () => {
        const mockResponse = {
            data: {
                results: [{name: "lucario"}],
            },
        }
        axios.get = jest.fn().mockResolvedValue(mockResponse);

        const pokemon = await pokemonRepository.findByIdOrName(undefined, undefined);

        expect(pokemon).toBeDefined();
        expect(mockResponse.data).toEqual(pokemon);
    })

    test("Should handle errors from the API call of findByIdOrName", async () => {
        axios.get = jest.fn().mockRejectedValue({ response: { status: 500 } });

        await expect(pokemonRepository.findByIdOrName(undefined, undefined))
            .rejects
            .toThrow("Internal server error, sorry for the inconvenience");
    });

});


