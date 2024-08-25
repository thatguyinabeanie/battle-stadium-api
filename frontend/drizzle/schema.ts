import { pgTable, uniqueIndex, index, bigserial, integer, varchar, text, bigint, timestamp, foreignKey, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const accounts = pgTable("accounts", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	userId: integer("userId").notNull(),
	type: varchar("type").notNull(),
	provider: varchar("provider").notNull(),
	providerAccountId: varchar("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	expiresAt: bigint("expires_at", { mode: "number" }),
	idToken: text("id_token"),
	scope: text("scope"),
	sessionState: text("session_state"),
	tokenType: text("token_type"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexAccountsOnProviderAndProviderAccountId: uniqueIndex("index_accounts_on_provider_and_providerAccountId").using("btree", table.provider.asc().nullsLast(), table.providerAccountId.asc().nullsLast()),
		indexAccountsOnUserId: index("index_accounts_on_userId").using("btree", table.userId.asc().nullsLast()),
	}
});

export const matches = pgTable("matches", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	roundId: bigint("round_id", { mode: "number" }).notNull(),
	tableNumber: integer("table_number"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	playerOneId: bigint("player_one_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	playerTwoId: bigint("player_two_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	winnerId: bigint("winner_id", { mode: "number" }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	playerOneCheckIn: timestamp("player_one_check_in", { precision: 6, mode: 'string' }),
	playerTwoCheckIn: timestamp("player_two_check_in", { precision: 6, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	loserId: bigint("loser_id", { mode: "number" }),
	reportedAt: timestamp("reported_at", { precision: 6, mode: 'string' }),
},
(table) => {
	return {
		indexMatchesOnLoserId: index("index_matches_on_loser_id").using("btree", table.loserId.asc().nullsLast()),
		indexMatchesOnPlayerOneId: index("index_matches_on_player_one_id").using("btree", table.playerOneId.asc().nullsLast()),
		indexMatchesOnPlayerTwoId: index("index_matches_on_player_two_id").using("btree", table.playerTwoId.asc().nullsLast()),
		indexMatchesOnRoundAndPlayersUnique: uniqueIndex("index_matches_on_round_and_players_unique").using("btree", table.roundId.asc().nullsLast(), table.playerOneId.asc().nullsLast(), table.playerTwoId.asc().nullsLast()),
		indexMatchesOnWinnerId: index("index_matches_on_winner_id").using("btree", table.winnerId.asc().nullsLast()),
		fkRails973A5646Ac: foreignKey({
			columns: [table.loserId],
			foreignColumns: [players.id],
			name: "fk_rails_973a5646ac"
		}),
		fkRailsBfcd6A3C9F: foreignKey({
			columns: [table.playerOneId],
			foreignColumns: [players.id],
			name: "fk_rails_bfcd6a3c9f"
		}),
		fkRailsB58C6C3513: foreignKey({
			columns: [table.playerTwoId],
			foreignColumns: [players.id],
			name: "fk_rails_b58c6c3513"
		}),
		fkRails9D0Deeb219: foreignKey({
			columns: [table.winnerId],
			foreignColumns: [players.id],
			name: "fk_rails_9d0deeb219"
		}),
		fkRailsE7C0250650: foreignKey({
			columns: [table.roundId],
			foreignColumns: [rounds.id],
			name: "fk_rails_e7c0250650"
		}),
	}
});

export const matchGames = pgTable("match_games", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	matchId: bigint("match_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	winnerId: bigint("winner_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	loserId: bigint("loser_id", { mode: "number" }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	gameNumber: integer("game_number").default(1).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	reporterId: bigint("reporter_id", { mode: "number" }),
	reportedAt: timestamp("reported_at", { precision: 6, mode: 'string' }),
},
(table) => {
	return {
		indexMatchGamesOnLoserId: index("index_match_games_on_loser_id").using("btree", table.loserId.asc().nullsLast()),
		indexMatchGamesOnMatchId: index("index_match_games_on_match_id").using("btree", table.matchId.asc().nullsLast()),
		indexMatchGamesOnReporterId: index("index_match_games_on_reporter_id").using("btree", table.reporterId.asc().nullsLast()),
		indexMatchGamesOnWinnerId: index("index_match_games_on_winner_id").using("btree", table.winnerId.asc().nullsLast()),
		fkRails76Cefaebc0: foreignKey({
			columns: [table.matchId],
			foreignColumns: [matches.id],
			name: "fk_rails_76cefaebc0"
		}),
		fkRailsA2C90Fc36D: foreignKey({
			columns: [table.loserId],
			foreignColumns: [players.id],
			name: "fk_rails_a2c90fc36d"
		}),
		fkRailsBe3D6Ef1Eb: foreignKey({
			columns: [table.winnerId],
			foreignColumns: [players.id],
			name: "fk_rails_be3d6ef1eb"
		}),
		fkRails85619F44A8: foreignKey({
			columns: [table.reporterId],
			foreignColumns: [users.id],
			name: "fk_rails_85619f44a8"
		}),
	}
});

export const games = pgTable("games", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: varchar("name"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexGamesOnLowerName: uniqueIndex("index_games_on_lower_name").using("btree", sql`lower((name)::text)`),
	}
});

export const organizationStaffMembers = pgTable("organization_staff_members", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	organizationId: bigint("organization_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexOrganizationStaffMembersOnOrganizationId: index("index_organization_staff_members_on_organization_id").using("btree", table.organizationId.asc().nullsLast()),
		indexOrganizationStaffMembersOnUserId: index("index_organization_staff_members_on_user_id").using("btree", table.userId.asc().nullsLast()),
		fkRailsA177A0142C: foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "fk_rails_a177a0142c"
		}),
		fkRails65Be078Ae6: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_rails_65be078ae6"
		}),
	}
});

export const phases = pgTable("phases", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
	numberOfRounds: integer("number_of_rounds").default(0).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	type: varchar("type").notNull(),
	name: varchar("name"),
	bestOf: integer("best_of").default(3).notNull(),
	startedAt: timestamp("started_at", { precision: 6, mode: 'string' }),
	endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
	order: integer("order").default(0).notNull(),
},
(table) => {
	return {
		indexPhasesOnTournamentId: index("index_phases_on_tournament_id").using("btree", table.tournamentId.asc().nullsLast()),
		indexPhasesOnType: index("index_phases_on_type").using("btree", table.type.asc().nullsLast()),
		fkRails75E775589E: foreignKey({
			columns: [table.tournamentId],
			foreignColumns: [tournaments.id],
			name: "fk_rails_75e775589e"
		}),
	}
});

export const organizations = pgTable("organizations", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: varchar("name"),
	description: text("description"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ownerId: bigint("owner_id", { mode: "number" }),
},
(table) => {
	return {
		indexOrganizationsOnName: uniqueIndex("index_organizations_on_name").using("btree", table.name.asc().nullsLast()),
		indexOrganizationsOnOwnerId: uniqueIndex("index_organizations_on_owner_id").using("btree", table.ownerId.asc().nullsLast()),
		fkRailsAb574863F6: foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "fk_rails_ab574863f6"
		}),
	}
});

export const tournamentFormats = pgTable("tournament_formats", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	formatId: bigint("format_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexTournamentFormatsOnFormatId: index("index_tournament_formats_on_format_id").using("btree", table.formatId.asc().nullsLast()),
		indexTournamentFormatsOnTournamentId: index("index_tournament_formats_on_tournament_id").using("btree", table.tournamentId.asc().nullsLast()),
		fkRails08C15D3C37: foreignKey({
			columns: [table.formatId],
			foreignColumns: [formats.id],
			name: "fk_rails_08c15d3c37"
		}),
		fkRailsC679052Dc0: foreignKey({
			columns: [table.tournamentId],
			foreignColumns: [tournaments.id],
			name: "fk_rails_c679052dc0"
		}),
	}
});

export const sessions = pgTable("sessions", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	userId: integer("userId").notNull(),
	expires: timestamp("expires", { precision: 6, mode: 'string' }).notNull(),
	sessionToken: varchar("sessionToken").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexSessionsOnSessionToken: uniqueIndex("index_sessions_on_sessionToken").using("btree", table.sessionToken.asc().nullsLast()),
		indexSessionsOnUserId: index("index_sessions_on_userId").using("btree", table.userId.asc().nullsLast()),
	}
});

export const rounds = pgTable("rounds", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	phaseId: bigint("phase_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	roundNumber: integer("round_number").default(1).notNull(),
	startedAt: timestamp("started_at", { precision: 6, mode: 'string' }),
	endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
},
(table) => {
	return {
		indexRoundsOnPhaseId: index("index_rounds_on_phase_id").using("btree", table.phaseId.asc().nullsLast()),
		indexRoundsOnPhaseIdAndRoundNumber: uniqueIndex("index_rounds_on_phase_id_and_round_number").using("btree", table.phaseId.asc().nullsLast(), table.roundNumber.asc().nullsLast()),
	}
});

export const pokemonTeams = pgTable("pokemon_teams", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexPokemonTeamsOnUserId: index("index_pokemon_teams_on_user_id").using("btree", table.userId.asc().nullsLast()),
		fkRailsF36F55A08C: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_rails_f36f55a08c"
		}),
	}
});

export const pokemon = pgTable("pokemon", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: varchar("name"),
	ability: varchar("ability"),
	teraType: varchar("tera_type"),
	nature: varchar("nature"),
	heldItem: varchar("held_item"),
	move1: varchar("move1"),
	move2: varchar("move2"),
	move3: varchar("move3"),
	move4: varchar("move4"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	nickname: varchar("nickname"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	pokemonTeamId: bigint("pokemon_team_id", { mode: "number" }).notNull(),
},
(table) => {
	return {
		indexPokemonOnPokemonTeamId: index("index_pokemon_on_pokemon_team_id").using("btree", table.pokemonTeamId.asc().nullsLast()),
		fkRails5B6022737B: foreignKey({
			columns: [table.pokemonTeamId],
			foreignColumns: [pokemonTeams.id],
			name: "fk_rails_5b6022737b"
		}),
	}
});

export const tournaments = pgTable("tournaments", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: varchar("name"),
	startAt: timestamp("start_at", { precision: 6, mode: 'string' }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	organizationId: bigint("organization_id", { mode: "number" }),
	checkInStartAt: timestamp("check_in_start_at", { precision: 6, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	gameId: bigint("game_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	formatId: bigint("format_id", { mode: "number" }),
	endedAt: timestamp("ended_at", { precision: 6, mode: 'string' }),
	registrationStartAt: timestamp("registration_start_at", { precision: 6, mode: 'string' }),
	registrationEndAt: timestamp("registration_end_at", { precision: 6, mode: 'string' }),
	playerCap: integer("player_cap"),
	autostart: boolean("autostart").default(false).notNull(),
	startedAt: timestamp("started_at", { precision: 6, mode: 'string' }),
	lateRegistration: boolean("late_registration").default(true).notNull(),
	teamlistsRequired: boolean("teamlists_required").default(true).notNull(),
	openTeamSheets: boolean("open_team_sheets").default(true).notNull(),
	endAt: timestamp("end_at", { precision: 6, mode: 'string' }),
},
(table) => {
	return {
		indexTournamentsOnFormatId: index("index_tournaments_on_format_id").using("btree", table.formatId.asc().nullsLast()),
		indexTournamentsOnGameId: index("index_tournaments_on_game_id").using("btree", table.gameId.asc().nullsLast()),
		indexTournamentsOnNameAndOrganizationId: uniqueIndex("index_tournaments_on_name_and_organization_id").using("btree", table.name.asc().nullsLast(), table.organizationId.asc().nullsLast()),
		indexTournamentsOnOrgIdNameStartDate: uniqueIndex("index_tournaments_on_org_id_name_start_date").using("btree", table.organizationId.asc().nullsLast(), table.name.asc().nullsLast(), table.startAt.asc().nullsLast()),
		indexTournamentsOnOrganizationId: index("index_tournaments_on_organization_id").using("btree", table.organizationId.asc().nullsLast()),
		fkRails8Ef7Ba6258: foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "fk_rails_8ef7ba6258"
		}),
		fkRails325Ccadea6: foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizations.id],
			name: "fk_rails_325ccadea6"
		}),
	}
});

export const verificationTokens = pgTable("verification_tokens", {
	"[:identifier, :token]": bigserial("[:identifier, :token]", { mode: "bigint" }).primaryKey().notNull(),
	identifier: text("identifier").notNull(),
	expires: timestamp("expires", { precision: 6, mode: 'string' }).notNull(),
	token: text("token").notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexVerificationTokensOnIdentifierAndToken: uniqueIndex("index_verification_tokens_on_identifier_and_token").using("btree", table.identifier.asc().nullsLast(), table.token.asc().nullsLast()),
	}
});

export const formats = pgTable("formats", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	name: varchar("name"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	gameId: bigint("game_id", { mode: "number" }),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexFormatsOnGameId: index("index_formats_on_game_id").using("btree", table.gameId.asc().nullsLast()),
		indexFormatsOnNameAndGameId: uniqueIndex("index_formats_on_name_and_game_id").using("btree", table.name.asc().nullsLast(), table.gameId.asc().nullsLast()),
		fkRailsA0E0605606: foreignKey({
			columns: [table.gameId],
			foreignColumns: [games.id],
			name: "fk_rails_a0e0605606"
		}),
	}
});

export const players = pgTable("players", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	teamSheetSubmitted: boolean("team_sheet_submitted").default(false).notNull(),
	checkedInAt: timestamp("checked_in_at", { mode: 'string' }),
	inGameName: varchar("in_game_name").default('').notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	pokemonTeamId: bigint("pokemon_team_id", { mode: "number" }),
},
(table) => {
	return {
		indexOnUserIdAndTournamentId: uniqueIndex("index_on_user_id_and_tournament_id").using("btree", table.userId.asc().nullsLast(), table.tournamentId.asc().nullsLast()),
		indexPlayersOnPokemonTeamId: index("index_players_on_pokemon_team_id").using("btree", table.pokemonTeamId.asc().nullsLast()),
		indexPlayersOnTournamentId: index("index_players_on_tournament_id").using("btree", table.tournamentId.asc().nullsLast()),
		indexPlayersOnUserId: index("index_players_on_user_id").using("btree", table.userId.asc().nullsLast()),
		fkRailsAeec102047: foreignKey({
			columns: [table.pokemonTeamId],
			foreignColumns: [pokemonTeams.id],
			name: "fk_rails_aeec102047"
		}),
		fkRailsF96Ec8A72F: foreignKey({
			columns: [table.tournamentId],
			foreignColumns: [tournaments.id],
			name: "fk_rails_f96ec8a72f"
		}),
		fkRails224Cac07Ce: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_rails_224cac07ce"
		}),
	}
});

export const users = pgTable("users", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	email: varchar("email").default('').notNull(),
	username: varchar("username").default(''),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
	encryptedPassword: varchar("encrypted_password").default('').notNull(),
	resetPasswordToken: varchar("reset_password_token"),
	resetPasswordSentAt: timestamp("reset_password_sent_at", { precision: 6, mode: 'string' }),
	rememberCreatedAt: timestamp("remember_created_at", { precision: 6, mode: 'string' }),
	signInCount: integer("sign_in_count").default(0).notNull(),
	currentSignInAt: timestamp("current_sign_in_at", { precision: 6, mode: 'string' }),
	lastSignInAt: timestamp("last_sign_in_at", { precision: 6, mode: 'string' }),
	currentSignInIp: varchar("current_sign_in_ip"),
	lastSignInIp: varchar("last_sign_in_ip"),
	confirmationToken: varchar("confirmation_token"),
	confirmedAt: timestamp("confirmed_at", { precision: 6, mode: 'string' }),
	confirmationSentAt: timestamp("confirmation_sent_at", { precision: 6, mode: 'string' }),
	unconfirmedEmail: varchar("unconfirmed_email"),
	failedAttempts: integer("failed_attempts").default(0).notNull(),
	unlockToken: varchar("unlock_token"),
	lockedAt: timestamp("locked_at", { precision: 6, mode: 'string' }),
	firstName: varchar("first_name"),
	lastName: varchar("last_name"),
	pronouns: varchar("pronouns"),
	jti: varchar("jti").default('invalid').notNull(),
	name: varchar("name"),
	emailVerified: timestamp("emailVerified", { precision: 6, mode: 'string' }),
	image: text("image"),
},
(table) => {
	return {
		indexUsersOnConfirmationToken: uniqueIndex("index_users_on_confirmation_token").using("btree", table.confirmationToken.asc().nullsLast()),
		indexUsersOnEmail: uniqueIndex("index_users_on_email").using("btree", table.email.asc().nullsLast()),
		indexUsersOnJti: uniqueIndex("index_users_on_jti").using("btree", table.jti.asc().nullsLast()),
		indexUsersOnResetPasswordToken: uniqueIndex("index_users_on_reset_password_token").using("btree", table.resetPasswordToken.asc().nullsLast()),
		indexUsersOnUnlockToken: uniqueIndex("index_users_on_unlock_token").using("btree", table.unlockToken.asc().nullsLast()),
		indexUsersOnUsername: uniqueIndex("index_users_on_username").using("btree", table.username.asc().nullsLast()),
	}
});

export const phasePlayers = pgTable("phase_players", {
	id: bigserial("id", { mode: "bigint" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	playerId: bigint("player_id", { mode: "number" }).notNull(),
	phaseType: varchar("phase_type").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	phaseId: bigint("phase_id", { mode: "number" }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
},
(table) => {
	return {
		indexPhasePlayersOnPlayerId: index("index_phase_players_on_player_id").using("btree", table.playerId.asc().nullsLast()),
		indexTournamentPhasePlayersOnPhase: index("index_tournament_phase_players_on_phase").using("btree", table.phaseType.asc().nullsLast(), table.phaseId.asc().nullsLast()),
		fkRails71Fbe65D92: foreignKey({
			columns: [table.playerId],
			foreignColumns: [players.id],
			name: "fk_rails_71fbe65d92"
		}),
	}
});

export const schemaMigrations = pgTable("schema_migrations", {
	version: varchar("version").primaryKey().notNull(),
});

export const arInternalMetadata = pgTable("ar_internal_metadata", {
	key: varchar("key").primaryKey().notNull(),
	value: varchar("value"),
	createdAt: timestamp("created_at", { precision: 6, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, mode: 'string' }).notNull(),
});