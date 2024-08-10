import { Factory } from 'rosie';
import { Pokemon } from '@/api/model/pokemon';

export const PokemonFactory = Factory.define<Pokemon>('Pokemon')
.attr('id', () => 0)
.attr('name', () => 'name')
.attr('nickname', () => undefined)
.attr('ability', () => 'ability')
.attr('tera_type', () => 'tera_type')
.attr('nature', () => 'nature')
.attr('held_item', () => undefined)
.attr('move1', () => undefined)
.attr('move2', () => undefined)
.attr('move3', () => undefined)
.attr('move4', () => undefined)
;