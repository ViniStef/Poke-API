import { Test, TestingModule } from '@nestjs/testing';
import {PokemonService} from "./application/services/pokemon.service";
import {PokemonRepository} from "./infrastructure/repositories/pokemon.repository";

describe("Integration Tests: GET Pokemon Data", () => {
    let pokemonService: PokemonService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [PokemonService, PokemonRepository],
        }).compile();

        pokemonService = app.get<PokemonService>(PokemonService);
    });

    describe("Testing the getPokemonByIdOrName method", () => {
        test("Should get the pokemon by id from repository", async () => {
            const pokemon = await pokemonService.getPokemonByIdOrName("10");

            expect(pokemon).toBeDefined();
            expect(pokemon.name).toEqual("caterpie");
        })

        test("Should throw an error if the id is negative", async () => {
            const negativeId = "-20";

            await expect(
                pokemonService.getPokemonByIdOrName(negativeId)
            ).rejects.toThrow("The Pokemon ID cannot be negative.");
        })

        test("Should throw an error if a pokemon with the given name does not exist", async () => {
            const nonExistingPokemon = "nonexistingpokemon";

            await expect(
                pokemonService.getPokemonByIdOrName(nonExistingPokemon)
            ).rejects.toThrow("Pokemon not found in the PokeAPI, please try with a different id or name.");
        })
    })

    describe("Testing the getPokemonsAndColorInfoByColor method", () => {
        test("Should get the color by name from repository", async () => {
            const color = await pokemonService.getPokemonsAndColorInfoByColor("yellow");

            expect(color).toBeDefined();
            expect(color.id).toEqual(10);
            expect(color.name).toEqual("yellow");
        })

        test("Should throw an error if the id is negative", async () => {
            const negativeId = "-3";

            await expect(
                pokemonService.getPokemonsAndColorInfoByColor(negativeId)
            ).rejects.toThrow("The Color ID cannot be negative.");
        })

        test("Should throw an error if the color with the given name does not exist", async () => {
            const nonExistingColor = "nonexistingcolor";


            await expect(
                pokemonService.getPokemonsAndColorInfoByColor(nonExistingColor)
            ).rejects.toThrow("Color not found in the PokeAPI, please try with a different id or color name.");
        })
    })

    describe("Testing the getPaginatedPokemons method", () => {
        test("Should get the correct amount of pokemons from the repository", async () => {
            const pokemonPaginated = await pokemonService.getPaginatedPokemons("1", "2");

            expect(pokemonPaginated).toBeDefined();
            expect(pokemonPaginated.next).toEqual("https://pokeapi.co/api/v2/pokemon?offset=3&limit=1");
            expect(pokemonPaginated.results[0].name).toEqual("venusaur");
        })


        test("Should be the standard 20 limit and 20 offset when sending wrong data type", async () => {
            const pokemonPaginated = await pokemonService.getPaginatedPokemons("invalid", "invalid");

            expect(pokemonPaginated).toBeDefined();
            expect(pokemonPaginated.count).toEqual(1302);
            expect(pokemonPaginated.next).toEqual("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");
        })
    })
});
