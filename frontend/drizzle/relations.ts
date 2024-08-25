import { relations } from "drizzle-orm/relations";
import { players, matches, rounds, matchGames, users, organizations, organizationStaffMembers, tournaments, phases, formats, tournamentFormats, pokemonTeams, pokemon, games, phasePlayers } from "./schema";

export const matchesRelations = relations(matches, ({one, many}) => ({
	player_loserId: one(players, {
		fields: [matches.loserId],
		references: [players.id],
		relationName: "matches_loserId_players_id"
	}),
	player_playerOneId: one(players, {
		fields: [matches.playerOneId],
		references: [players.id],
		relationName: "matches_playerOneId_players_id"
	}),
	player_playerTwoId: one(players, {
		fields: [matches.playerTwoId],
		references: [players.id],
		relationName: "matches_playerTwoId_players_id"
	}),
	player_winnerId: one(players, {
		fields: [matches.winnerId],
		references: [players.id],
		relationName: "matches_winnerId_players_id"
	}),
	round: one(rounds, {
		fields: [matches.roundId],
		references: [rounds.id]
	}),
	matchGames: many(matchGames),
}));

export const playersRelations = relations(players, ({one, many}) => ({
	matches_loserId: many(matches, {
		relationName: "matches_loserId_players_id"
	}),
	matches_playerOneId: many(matches, {
		relationName: "matches_playerOneId_players_id"
	}),
	matches_playerTwoId: many(matches, {
		relationName: "matches_playerTwoId_players_id"
	}),
	matches_winnerId: many(matches, {
		relationName: "matches_winnerId_players_id"
	}),
	matchGames_loserId: many(matchGames, {
		relationName: "matchGames_loserId_players_id"
	}),
	matchGames_winnerId: many(matchGames, {
		relationName: "matchGames_winnerId_players_id"
	}),
	pokemonTeam: one(pokemonTeams, {
		fields: [players.pokemonTeamId],
		references: [pokemonTeams.id]
	}),
	tournament: one(tournaments, {
		fields: [players.tournamentId],
		references: [tournaments.id]
	}),
	user: one(users, {
		fields: [players.userId],
		references: [users.id]
	}),
	phasePlayers: many(phasePlayers),
}));

export const roundsRelations = relations(rounds, ({many}) => ({
	matches: many(matches),
}));

export const matchGamesRelations = relations(matchGames, ({one}) => ({
	match: one(matches, {
		fields: [matchGames.matchId],
		references: [matches.id]
	}),
	player_loserId: one(players, {
		fields: [matchGames.loserId],
		references: [players.id],
		relationName: "matchGames_loserId_players_id"
	}),
	player_winnerId: one(players, {
		fields: [matchGames.winnerId],
		references: [players.id],
		relationName: "matchGames_winnerId_players_id"
	}),
	user: one(users, {
		fields: [matchGames.reporterId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	matchGames: many(matchGames),
	organizationStaffMembers: many(organizationStaffMembers),
	organizations: many(organizations),
	pokemonTeams: many(pokemonTeams),
	players: many(players),
}));

export const organizationStaffMembersRelations = relations(organizationStaffMembers, ({one}) => ({
	organization: one(organizations, {
		fields: [organizationStaffMembers.organizationId],
		references: [organizations.id]
	}),
	user: one(users, {
		fields: [organizationStaffMembers.userId],
		references: [users.id]
	}),
}));

export const organizationsRelations = relations(organizations, ({one, many}) => ({
	organizationStaffMembers: many(organizationStaffMembers),
	user: one(users, {
		fields: [organizations.ownerId],
		references: [users.id]
	}),
	tournaments: many(tournaments),
}));

export const phasesRelations = relations(phases, ({one}) => ({
	tournament: one(tournaments, {
		fields: [phases.tournamentId],
		references: [tournaments.id]
	}),
}));

export const tournamentsRelations = relations(tournaments, ({one, many}) => ({
	phases: many(phases),
	tournamentFormats: many(tournamentFormats),
	game: one(games, {
		fields: [tournaments.gameId],
		references: [games.id]
	}),
	organization: one(organizations, {
		fields: [tournaments.organizationId],
		references: [organizations.id]
	}),
	players: many(players),
}));

export const tournamentFormatsRelations = relations(tournamentFormats, ({one}) => ({
	format: one(formats, {
		fields: [tournamentFormats.formatId],
		references: [formats.id]
	}),
	tournament: one(tournaments, {
		fields: [tournamentFormats.tournamentId],
		references: [tournaments.id]
	}),
}));

export const formatsRelations = relations(formats, ({one, many}) => ({
	tournamentFormats: many(tournamentFormats),
	game: one(games, {
		fields: [formats.gameId],
		references: [games.id]
	}),
}));

export const pokemonTeamsRelations = relations(pokemonTeams, ({one, many}) => ({
	user: one(users, {
		fields: [pokemonTeams.userId],
		references: [users.id]
	}),
	pokemon: many(pokemon),
	players: many(players),
}));

export const pokemonRelations = relations(pokemon, ({one}) => ({
	pokemonTeam: one(pokemonTeams, {
		fields: [pokemon.pokemonTeamId],
		references: [pokemonTeams.id]
	}),
}));

export const gamesRelations = relations(games, ({many}) => ({
	tournaments: many(tournaments),
	formats: many(formats),
}));

export const phasePlayersRelations = relations(phasePlayers, ({one}) => ({
	player: one(players, {
		fields: [phasePlayers.playerId],
		references: [players.id]
	}),
}));