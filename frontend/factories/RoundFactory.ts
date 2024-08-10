import { Factory } from 'rosie';
import { Round } from '@/api/model/round';

export const RoundFactory = Factory.define<Round>('Round')
.attr('id', () => 0)
.attr('phase_id', () => 0)
.attr('round_number', () => 0)
.attr('started_at', () => undefined)
.attr('ended_at', () => undefined)
;