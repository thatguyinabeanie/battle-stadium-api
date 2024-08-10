import { Factory } from 'rosie';
import { Format } from '@/api/model/format';
import { GameDetail } from '@/api/model/game-detail';
import { GameRequest } from '@/api/model/game-request';
import { Game } from '@/api/model/game';
import { OrganizationDetails } from '@/api/model/organization-details';
import { Organization } from '@/api/model/organization';
import { PasswordRequest } from '@/api/model/password-request';
import { PhaseDetails } from '@/api/model/phase-details';
import { Phase } from '@/api/model/phase';
import { PlayerDetails } from '@/api/model/player-details';
import { PlayerRequest } from '@/api/model/player-request';
import { Player } from '@/api/model/player';
import { Pokemon } from '@/api/model/pokemon';
import { Round } from '@/api/model/round';
import { TournamentDetails } from '@/api/model/tournament-details';
import { TournamentPostRequest } from '@/api/model/tournament-post-request';
import { TournamentRequest } from '@/api/model/tournament-request';
import { Tournament } from '@/api/model/tournament';
import { UserDetails } from '@/api/model/user-details';
import { UserLoginRequest } from '@/api/model/user-login-request';
import { UserPostRequest } from '@/api/model/user-post-request';
import { UserRequest } from '@/api/model/user-request';
import { User } from '@/api/model/user';

export const FormatFactory = new Factory<Format>()
  .attr('id', () => 0)
  .attr('name', () => 'name')
;
export const GameDetailFactory = new Factory<GameDetail>()
  .attr('id', () => 0)
  .attr('name', () => 'name')
  .attr('formats', () => undefined)
;
export const GameRequestFactory = new Factory<GameRequest>()
  .attr('id', () => 0)
  .attr('name', () => 'name')
;
export const GameFactory = new Factory<Game>()
  .attr('id', () => 0)
  .attr('name', () => 'name')
;
export const OrganizationDetailsFactory = new Factory<OrganizationDetails>()
  .attr('id', () => 0)
  .attr('name', () => 'name')
  .attr('owner', () => undefined)
  .attr('description', () => undefined)
;
export const OrganizationFactory = new Factory<Organization>()
  .attr('id', () => 0)
  .attr('name', () => 'name')
  .attr('owner', () => undefined)
  .attr('description', () => undefined)
;
export const PasswordRequestFactory = new Factory<PasswordRequest>()
  .attr('password', () => 'password')
  .attr('password_confirmation', () => 'password_confirmation')
;
export const PhaseDetailsFactory = new Factory<PhaseDetails>()
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
export const PhaseFactory = new Factory<Phase>()
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
;
export const PlayerDetailsFactory = new Factory<PlayerDetails>()
  .attr('id', () => 0)
  .attr('user', () => undefined)
  .attr('in_game_name', () => 'in_game_name')
;
export const PlayerRequestFactory = new Factory<PlayerRequest>()
  .attr('user_id', () => 0)
  .attr('in_game_name', () => 'in_game_name')
;
export const PlayerFactory = new Factory<Player>()
  .attr('id', () => 0)
  .attr('user', () => undefined)
  .attr('in_game_name', () => 'in_game_name')
;
export const PokemonFactory = new Factory<Pokemon>()
  .attr('id', () => 0)
  .attr('name', () => 'name')
  .attr('nickname', () => undefined)
  .attr('ability', () => 'ability')
  .attr('tera_type', () => 'tera_type')
  .attr('nature', () => 'nature')
  .attr('held_item', () => undefined)
  .attr('move1', () => undefined)
  .attr('move2', () => undefined)
  .attr('move3', () => undefined)
  .attr('move4', () => undefined)
;
export const RoundFactory = new Factory<Round>()
  .attr('id', () => 0)
  .attr('phase_id', () => 0)
  .attr('round_number', () => 0)
  .attr('started_at', () => undefined)
  .attr('ended_at', () => undefined)
;
export const TournamentDetailsFactory = new Factory<TournamentDetails>()
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
export const TournamentPostRequestFactory = new Factory<TournamentPostRequest>()
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
export const TournamentRequestFactory = new Factory<TournamentRequest>()
  .attr('id', () => 0)
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
export const TournamentFactory = new Factory<Tournament>()
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
export const UserDetailsFactory = new Factory<UserDetails>()
  .attr('username', () => 'username')
  .attr('pronouns', () => 'pronouns')
  .attr('email', () => 'email')
  .attr('first_name', () => 'first_name')
  .attr('last_name', () => 'last_name')
  .attr('id', () => 0)
;
export const UserLoginRequestFactory = new Factory<UserLoginRequest>()
  .attr('email', () => 'email')
  .attr('password', () => 'password')
;
export const UserPostRequestFactory = new Factory<UserPostRequest>()
  .attr('username', () => 'username')
  .attr('pronouns', () => 'pronouns')
  .attr('email', () => 'email')
  .attr('first_name', () => 'first_name')
  .attr('last_name', () => 'last_name')
  .attr('id', () => 0)
  .attr('password', () => 'password')
  .attr('password_confirmation', () => 'password_confirmation')
;
export const UserRequestFactory = new Factory<UserRequest>()
  .attr('username', () => 'username')
  .attr('pronouns', () => 'pronouns')
  .attr('email', () => 'email')
  .attr('first_name', () => 'first_name')
  .attr('last_name', () => 'last_name')
  .attr('id', () => 0)
  .attr('current_password', () => 'current_password')
;
export const UserFactory = new Factory<User>()
  .attr('username', () => 'username')
  .attr('pronouns', () => 'pronouns')
  .attr('id', () => 0)
;