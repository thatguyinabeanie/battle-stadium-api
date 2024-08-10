import { Factory } from 'rosie';
import { PlayerRequest } from '@/api/model/playerRequest';

export const PlayerRequestFactory = Factory.define<PlayerRequest>('PlayerRequest')
.attr('user_id', () => 0)
.attr('in_game_name', () => 'in_game_name')
;