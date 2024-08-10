import { Factory } from 'rosie';
import { Game } from '@/api/model/game';

export const GameFactory = Factory.define<Game>('Game')
.attr('id', () => 0)
.attr('name', () => 'name')
;