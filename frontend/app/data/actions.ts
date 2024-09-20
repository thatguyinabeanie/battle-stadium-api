"use server";

import { BattleStadiumAPI } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";

export async function getMe() {
  return (await BattleStadiumAPI(auth()).Users.me()).data;
}

export async function getTournament(tournamentId: number) {
  return (await BattleStadiumAPI(auth()).Tournaments.get(tournamentId)).data;
}

export async function getOrganizations() {
  return (await BattleStadiumAPI(auth()).Organizations.list()).data;
}

export async function getOrganization(slug: string) {
  return (await BattleStadiumAPI(auth()).Organizations.get(slug)).data;
}

export async function getOrganizationTournaments(slug: string) {
  return (await BattleStadiumAPI(auth()).Organizations.Tournaments.list(slug)).data;
}
