import { Factory } from 'rosie';
import { GameRequest } from '@/api/model/game-request';

export const GameRequestFactory = Factory.define<GameRequest>('GameRequest')
.attr('id', () => 0)
.attr('name', () => 'name')
;