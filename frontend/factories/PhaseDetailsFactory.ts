import { Factory } from 'rosie';
import { PhaseDetails } from '@/api/model/phaseDetails';

export const PhaseDetailsFactory = Factory.define<PhaseDetails>('PhaseDetails')
.attr('id', () => 0)
.attr('name', () => 'name')
.attr('order', () => 0)
.attr('type', () => 'type')
.attr('tournament_id', () => 0)
.attr('number_of_rounds', () => 0)
.attr('best_of', () => 0)
.attr('criteria', () => undefined)
.attr('started_at', () => undefined)
.attr('ended_at', () => undefined)
.attr('created_at', () => 'created_at')
.attr('updated_at', () => 'updated_at')
.attr('players', () => undefined)
.attr('rounds', () => undefined)
;