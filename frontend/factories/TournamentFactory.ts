import { Factory } from 'rosie';
import { Tournament } from '@/api/model/tournament';

export const TournamentFactory = Factory.define<Tournament>('Tournament')
.attr('id', () => 0)
.attr('name', () => 'name')
.attr('start_at', () => undefined)
.attr('organization', () => undefined)
.attr('format', () => undefined)
.attr('game', () => undefined)
.attr('player_cap', () => undefined)
.attr('player_count', () => 0)
.attr('end_at', () => undefined)
.attr('started_at', () => undefined)
.attr('ended_at', () => undefined)
.attr('registration_start_at', () => undefined)
.attr('registration_end_at', () => undefined)
.attr('late_registration', () => false)
;