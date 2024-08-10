import { Factory } from 'rosie';
import { TournamentDetails } from '@/api/model/tournamentDetails';

export const TournamentDetailsFactory = Factory.define<TournamentDetails>('TournamentDetails')
.attr('id', () => 0)
.attr('name', () => 'name')
.attr('player_cap', () => undefined)
.attr('player_count', () => 0)
.attr('end_at', () => undefined)
.attr('started_at', () => undefined)
.attr('ended_at', () => undefined)
.attr('registration_start_at', () => undefined)
.attr('registration_end_at', () => undefined)
.attr('late_registration', () => false)
.attr('autostart', () => false)
.attr('start_at', () => undefined)
.attr('organization', () => undefined)
.attr('format', () => undefined)
.attr('game', () => undefined)
.attr('check_in_start_at', () => undefined)
.attr('teamlists_required', () => false)
.attr('open_team_sheets', () => false)
;