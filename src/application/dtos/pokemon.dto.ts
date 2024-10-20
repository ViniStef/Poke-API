// Pode ter campos omitidos caso necessário para resposta do controller.

export class PokemonDto {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: any[];
    forms: any[];
    game_indices: any[];
    held_items: any[];
    location_area_encounter: string;
    moves: any[];
    past_types: any[];
    sprites: any[];
    cries: any[];
    species: any[];
    stats: any[];
    types: any[];
}