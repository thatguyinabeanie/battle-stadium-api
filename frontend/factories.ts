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
  .sequence('id')
  .attr('name', 'name')
;
export const GameDetailFactory = new Factory<GameDetail>()
  .sequence('id')
  .attr('name', 'name')
  .attr('formats', Array<Format>Factory.build())
;
export const GameRequestFactory = new Factory<GameRequest>()
  .sequence('id')
  .attr('name', 'name')
;
export const GameFactory = new Factory<Game>()
  .sequence('id')
  .attr('name', 'name')
;
export const OrganizationDetailsFactory = new Factory<OrganizationDetails>()
  .sequence('id')
  .attr('name', 'name')
  .attr('owner', UserFactory.build())
  .attr('description', string | nullFactory.build())
;
export const OrganizationFactory = new Factory<Organization>()
  .sequence('id')
  .attr('name', 'name')
  .attr('owner', UserFactory.build())
  .attr('description', string | nullFactory.build())
;
export const PasswordRequestFactory = new Factory<PasswordRequest>()
  .attr('password', 'password')
  .attr('password_confirmation', 'password_confirmation')
;
export const PhaseDetailsFactory = new Factory<PhaseDetails>()
  .sequence('id')
  .attr('name', 'name')
  .attr('order', 0)
  .attr('type', 'type')
  .attr('tournament_id', 0)
  .attr('number_of_rounds', 0)
  .attr('best_of', 0)
  .attr('criteria', string | nullFactory.build())
  .attr('started_at', string | nullFactory.build())
  .attr('ended_at', string | nullFactory.build())
  .attr('created_at', 'created_at')
  .attr('updated_at', 'updated_at')
  .attr('players', Array<Player>Factory.build())
  .attr('rounds', Array<Round>Factory.build())
;
export const PhaseFactory = new Factory<Phase>()
  .sequence('id')
  .attr('name', 'name')
  .attr('order', 0)
  .attr('type', 'type')
  .attr('tournament_id', 0)
  .attr('number_of_rounds', 0)
  .attr('best_of', 0)
  .attr('criteria', string | nullFactory.build())
  .attr('started_at', string | nullFactory.build())
  .attr('ended_at', string | nullFactory.build())
  .attr('created_at', 'created_at')
  .attr('updated_at', 'updated_at')
;
export const PlayerDetailsFactory = new Factory<PlayerDetails>()
  .sequence('id')
  .attr('user', UserFactory.build())
  .attr('in_game_name', 'in_game_name')
;
export const PlayerRequestFactory = new Factory<PlayerRequest>()
  .attr('user_id', 0)
  .attr('in_game_name', 'in_game_name')
;
export const PlayerFactory = new Factory<Player>()
  .sequence('id')
  .attr('user', UserFactory.build())
  .attr('in_game_name', 'in_game_name')
;
export const PokemonFactory = new Factory<Pokemon>()
  .sequence('id')
  .attr('name', 'name')
  .attr('nickname', string | nullFactory.build())
  .attr('ability', 'ability')
  .attr('tera_type', 'tera_type')
  .attr('nature', 'nature')
  .attr('held_item', string | nullFactory.build())
  .attr('move1', string | nullFactory.build())
  .attr('move2', string | nullFactory.build())
  .attr('move3', string | nullFactory.build())
  .attr('move4', string | nullFactory.build())
;
export const RoundFactory = new Factory<Round>()
  .sequence('id')
  .attr('phase_id', 0)
  .attr('round_number', 0)
  .attr('started_at', string | nullFactory.build())
  .attr('ended_at', string | nullFactory.build())
;
export const TournamentDetailsFactory = new Factory<TournamentDetails>()
  .sequence('id')
  .attr('name', 'name')
  .attr('player_cap', number | nullFactory.build())
  .attr('player_count', 0)
  .attr('end_at', string | nullFactory.build())
  .attr('started_at', string | nullFactory.build())
  .attr('ended_at', string | nullFactory.build())
  .attr('registration_start_at', string | nullFactory.build())
  .attr('registration_end_at', string | nullFactory.build())
  .attr('late_registration', false)
  .attr('autostart', false)
  .attr('start_at', string | nullFactory.build())
  .attr('organization', OrganizationFactory.build())
  .attr('format', FormatFactory.build())
  .attr('game', GameFactory.build())
  .attr('check_in_start_at', string | nullFactory.build())
  .attr('teamlists_required', false)
  .attr('open_team_sheets', false)
;
export const TournamentPostRequestFactory = new Factory<TournamentPostRequest>()
  .attr('organization_id', 0)
  .attr('name', 'name')
  .attr('game_id', 0)
  .attr('format_id', 0)
  .attr('autostart', false)
  .attr('start_at', 'start_at')
  .attr('player_cap', number | nullFactory.build())
  .attr('registration_start_at', string | nullFactory.build())
  .attr('registration_end_at', string | nullFactory.build())
  .attr('late_registration', false)
  .attr('check_in_start_at', string | nullFactory.build())
  .attr('open_team_sheets', false)
  .attr('teamlists_required', false)
;
export const TournamentRequestFactory = new Factory<TournamentRequest>()
  .sequence('id')
  .attr('name', 'name')
  .attr('game_id', 0)
  .attr('format_id', 0)
  .attr('autostart', false)
  .attr('start_at', 'start_at')
  .attr('player_cap', number | nullFactory.build())
  .attr('registration_start_at', string | nullFactory.build())
  .attr('registration_end_at', string | nullFactory.build())
  .attr('late_registration', false)
  .attr('check_in_start_at', string | nullFactory.build())
  .attr('open_team_sheets', false)
  .attr('teamlists_required', false)
;
export const TournamentFactory = new Factory<Tournament>()
  .sequence('id')
  .attr('name', 'name')
  .attr('start_at', string | nullFactory.build())
  .attr('organization', OrganizationFactory.build())
  .attr('format', FormatFactory.build())
  .attr('game', GameFactory.build())
  .attr('player_cap', number | nullFactory.build())
  .attr('player_count', 0)
  .attr('end_at', string | nullFactory.build())
  .attr('started_at', string | nullFactory.build())
  .attr('ended_at', string | nullFactory.build())
  .attr('registration_start_at', string | nullFactory.build())
  .attr('registration_end_at', string | nullFactory.build())
  .attr('late_registration', false)
;
export const UserDetailsFactory = new Factory<UserDetails>()
  .attr('username', 'username')
  .attr('pronouns', 'pronouns')
  .attr('email', 'email')
  .attr('first_name', 'first_name')
  .attr('last_name', 'last_name')
  .sequence('id')
;
export const UserLoginRequestFactory = new Factory<UserLoginRequest>()
  .attr('email', 'email')
  .attr('password', 'password')
;
export const UserPostRequestFactory = new Factory<UserPostRequest>()
  .attr('username', 'username')
  .attr('pronouns', 'pronouns')
  .attr('email', 'email')
  .attr('first_name', 'first_name')
  .attr('last_name', 'last_name')
  .sequence('id')
  .attr('password', 'password')
  .attr('password_confirmation', 'password_confirmation')
;
export const UserRequestFactory = new Factory<UserRequest>()
  .attr('username', 'username')
  .attr('pronouns', 'pronouns')
  .attr('email', 'email')
  .attr('first_name', 'first_name')
  .attr('last_name', 'last_name')
  .sequence('id')
  .attr('current_password', 'current_password')
;
export const UserFactory = new Factory<User>()
  .attr('username', 'username')
  .attr('pronouns', 'pronouns')
  .sequence('id')
;