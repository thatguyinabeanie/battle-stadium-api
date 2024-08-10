import { Factory } from 'rosie';
import { Player } from '@/api/model/player';

export const PlayerFactory = Factory.define<Player>('Player')
.attr('id', () => 0)
.attr('user', () => undefined)
.attr('in_game_name', () => 'in_game_name')
;