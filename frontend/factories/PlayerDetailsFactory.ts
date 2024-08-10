import { Factory } from 'rosie';
import { PlayerDetails } from '@/api/model/playerDetails';

export const PlayerDetailsFactory = Factory.define<PlayerDetails>('PlayerDetails')
.attr('id', () => 0)
.attr('user', () => undefined)
.attr('in_game_name', () => 'in_game_name')
;