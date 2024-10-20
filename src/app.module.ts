import { Module } from '@nestjs/common';
import { PokemonModule } from "./application/modules/pokemon.module";

@Module({
  imports: [PokemonModule],
})

export class AppModule {}
