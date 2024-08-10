import { Factory } from 'rosie';
import { GameDetail } from '@/api/model/gameDetail';

export const GameDetailFactory = Factory.define<GameDetail>('GameDetail')
.attr('id', () => 0)
.attr('name', () => 'name')
.attr('formats', () => undefined)
;