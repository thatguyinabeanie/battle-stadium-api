// api-mock-setup.ts

import { mock } from "bun:test";
import { OrganizationFactory } from "@/factories";

// Mock the BattleStadiumAPI module
mock.module("@/lib/api/battle-stadium-api", () => {
  const BattleStadiumAPI = () => ({
    Organizations: {
      get: async (_id: string) => {
        const org = OrganizationFactory.build();
        return Promise.resolve(org);
      },
      list: async () => {
        const org = OrganizationFactory.build();
        return Promise.resolve([org]);
      }
      // Add other methods if needed
    },
  });

  return {
    default: BattleStadiumAPI,
    BattleStadiumAPI,
  };
});
