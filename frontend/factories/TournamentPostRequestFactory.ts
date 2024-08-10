import { Factory } from 'rosie';
import { TournamentPostRequest } from '@/api/model/tournament-post-request';

export const TournamentPostRequestFactory = Factory.define<TournamentPostRequest>('TournamentPostRequest')
.attr('organization_id', () => 0)
.attr('name', () => 'name')
.attr('game_id', () => 0)
.attr('format_id', () => 0)
.attr('autostart', () => false)
.attr('start_at', () => 'start_at')
.attr('player_cap', () => undefined)
.attr('registration_start_at', () => undefined)
.attr('registration_end_at', () => undefined)
.attr('late_registration', () => false)
.attr('check_in_start_at', () => undefined)
.attr('open_team_sheets', () => false)
.attr('teamlists_required', () => false)
;