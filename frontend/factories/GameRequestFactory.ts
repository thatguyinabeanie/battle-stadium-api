import { Factory } from 'rosie';
import { GameRequest } from '@/api/model/gameRequest';

export const GameRequestFactory = Factory.define<GameRequest>('GameRequest')
.attr('id', () => 0)
.attr('name', () => 'name')
;