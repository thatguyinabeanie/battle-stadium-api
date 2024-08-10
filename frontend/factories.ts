import { faker } from '@faker-js/faker';
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
  .attr('name', () => faker.lorem.word())
;
export const GameDetailFactory = new Factory<GameDetail>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('formats', ['id'], (id) => FormatFactory.buildList(faker.number.int({min: 1, max: 5}), { id }))
;
export const GameRequestFactory = new Factory<GameRequest>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
;
export const GameFactory = new Factory<Game>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
;
export const OrganizationDetailsFactory = new Factory<OrganizationDetails>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('owner', () => UserFactory.build())
  .attr('description', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
;
export const OrganizationFactory = new Factory<Organization>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('owner', () => UserFactory.build())
  .attr('description', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
;
export const PasswordRequestFactory = new Factory<PasswordRequest>()
  .attr('password', () => faker.lorem.word())
  .attr('password_confirmation', () => faker.date.recent().toISOString())
;
export const PhaseDetailsFactory = new Factory<PhaseDetails>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('order', () => faker.number.int({min: 1, max: 100}))
  .attr('type', () => faker.lorem.word())
  .attr('tournament_id', () => faker.number.int({min: 1, max: 100}))
  .attr('number_of_rounds', () => faker.number.int({min: 1, max: 100}))
  .attr('best_of', () => faker.number.int({min: 1, max: 100}))
  .attr('criteria', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('started_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('ended_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('created_at', () => faker.date.recent().toISOString())
  .attr('updated_at', () => faker.date.recent().toISOString())
  .attr('players', ['id'], (id) => PlayerFactory.buildList(faker.number.int({min: 1, max: 5}), { id }))
  .attr('rounds', ['id'], (id) => RoundFactory.buildList(faker.number.int({min: 1, max: 5}), { id }))
;
export const PhaseFactory = new Factory<Phase>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('order', () => faker.number.int({min: 1, max: 100}))
  .attr('type', () => faker.lorem.word())
  .attr('tournament_id', () => faker.number.int({min: 1, max: 100}))
  .attr('number_of_rounds', () => faker.number.int({min: 1, max: 100}))
  .attr('best_of', () => faker.number.int({min: 1, max: 100}))
  .attr('criteria', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('started_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('ended_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('created_at', () => faker.date.recent().toISOString())
  .attr('updated_at', () => faker.date.recent().toISOString())
;
export const PlayerDetailsFactory = new Factory<PlayerDetails>()
  .sequence('id')
  .attr('user', () => UserFactory.build())
  .attr('in_game_name', () => faker.lorem.word())
;
export const PlayerRequestFactory = new Factory<PlayerRequest>()
  .attr('user_id', () => faker.number.int({min: 1, max: 100}))
  .attr('in_game_name', () => faker.lorem.word())
;
export const PlayerFactory = new Factory<Player>()
  .sequence('id')
  .attr('user', () => UserFactory.build())
  .attr('in_game_name', () => faker.lorem.word())
;
export const PokemonFactory = new Factory<Pokemon>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('nickname', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('ability', () => faker.lorem.word())
  .attr('tera_type', () => faker.lorem.word())
  .attr('nature', () => faker.date.recent().toISOString())
  .attr('held_item', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('move1', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('move2', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('move3', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('move4', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
;
export const RoundFactory = new Factory<Round>()
  .sequence('id')
  .attr('phase_id', () => faker.number.int({min: 1, max: 100}))
  .attr('round_number', () => faker.number.int({min: 1, max: 100}))
  .attr('started_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('ended_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
;
export const TournamentDetailsFactory = new Factory<TournamentDetails>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('player_cap', () => faker.helpers.maybe(() => faker.number.int({min: 1, max: 100}), {probability: 0.8}))
  .attr('player_count', () => faker.number.int({min: 1, max: 100}))
  .attr('end_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('started_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('ended_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('registration_start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('registration_end_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('late_registration', () => faker.datatype.boolean())
  .attr('autostart', () => faker.datatype.boolean())
  .attr('start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('organization', () => OrganizationFactory.build())
  .attr('format', () => FormatFactory.build())
  .attr('game', () => GameFactory.build())
  .attr('check_in_start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('teamlists_required', () => faker.datatype.boolean())
  .attr('open_team_sheets', () => faker.datatype.boolean())
;
export const TournamentPostRequestFactory = new Factory<TournamentPostRequest>()
  .attr('organization_id', () => faker.number.int({min: 1, max: 100}))
  .attr('name', () => faker.lorem.word())
  .attr('game_id', () => faker.number.int({min: 1, max: 100}))
  .attr('format_id', () => faker.number.int({min: 1, max: 100}))
  .attr('autostart', () => faker.datatype.boolean())
  .attr('start_at', () => faker.date.recent().toISOString())
  .attr('player_cap', () => faker.helpers.maybe(() => faker.number.int({min: 1, max: 100}), {probability: 0.8}))
  .attr('registration_start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('registration_end_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('late_registration', () => faker.datatype.boolean())
  .attr('check_in_start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('open_team_sheets', () => faker.datatype.boolean())
  .attr('teamlists_required', () => faker.datatype.boolean())
;
export const TournamentRequestFactory = new Factory<TournamentRequest>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('game_id', () => faker.number.int({min: 1, max: 100}))
  .attr('format_id', () => faker.number.int({min: 1, max: 100}))
  .attr('autostart', () => faker.datatype.boolean())
  .attr('start_at', () => faker.date.recent().toISOString())
  .attr('player_cap', () => faker.helpers.maybe(() => faker.number.int({min: 1, max: 100}), {probability: 0.8}))
  .attr('registration_start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('registration_end_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('late_registration', () => faker.datatype.boolean())
  .attr('check_in_start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('open_team_sheets', () => faker.datatype.boolean())
  .attr('teamlists_required', () => faker.datatype.boolean())
;
export const TournamentFactory = new Factory<Tournament>()
  .sequence('id')
  .attr('name', () => faker.lorem.word())
  .attr('start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('organization', () => OrganizationFactory.build())
  .attr('format', () => FormatFactory.build())
  .attr('game', () => GameFactory.build())
  .attr('player_cap', () => faker.helpers.maybe(() => faker.number.int({min: 1, max: 100}), {probability: 0.8}))
  .attr('player_count', () => faker.number.int({min: 1, max: 100}))
  .attr('end_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('started_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('ended_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('registration_start_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('registration_end_at', () => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8}))
  .attr('late_registration', () => faker.datatype.boolean())
;
export const UserDetailsFactory = new Factory<UserDetails>()
  .attr('username', () => faker.lorem.word())
  .attr('pronouns', () => faker.lorem.word())
  .attr('email', () => `${faker.internet.userName()}@example.com`)
  .attr('first_name', () => faker.lorem.word())
  .attr('last_name', () => faker.lorem.word())
  .sequence('id')
;
export const UserLoginRequestFactory = new Factory<UserLoginRequest>()
  .attr('email', () => `${faker.internet.userName()}@example.com`)
  .attr('password', () => faker.lorem.word())
;
export const UserPostRequestFactory = new Factory<UserPostRequest>()
  .attr('username', () => faker.lorem.word())
  .attr('pronouns', () => faker.lorem.word())
  .attr('email', () => `${faker.internet.userName()}@example.com`)
  .attr('first_name', () => faker.lorem.word())
  .attr('last_name', () => faker.lorem.word())
  .sequence('id')
  .attr('password', () => faker.lorem.word())
  .attr('password_confirmation', () => faker.date.recent().toISOString())
;
export const UserRequestFactory = new Factory<UserRequest>()
  .attr('username', () => faker.lorem.word())
  .attr('pronouns', () => faker.lorem.word())
  .attr('email', () => `${faker.internet.userName()}@example.com`)
  .attr('first_name', () => faker.lorem.word())
  .attr('last_name', () => faker.lorem.word())
  .sequence('id')
  .attr('current_password', () => faker.lorem.word())
;
export const UserFactory = new Factory<User>()
  .attr('username', () => faker.lorem.word())
  .attr('pronouns', () => faker.lorem.word())
  .sequence('id')
;