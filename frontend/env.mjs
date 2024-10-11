import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    VERCEL_URL: z.string().optional(),
    VERCEL_ENV: z.string().optional(),
    VERCEL_OIDC_TOKEN: z.string().optional(),
    COOKIE_DOMAIN: z.string().optional(),
    NODE_ENV: z.string().default("development"),
    MEASUREMENT_ID: z.string().optional().default("G-XXXXXXXXXX"),
    PROD_API_BASE_URL: z.string().optional(),
    WEBSOCKET_URL: z.string().optional(),
    NEON_DATABASE_URL: z.string().optional(),

    LOCAL_DEV_BACKEND_HOST: z.string().optional().default("localhost"),
    LOCAL_DEV_BACKEND_PORT: z.number().optional().default(10000),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().optional().default("/sign-in"),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().optional().default("/sign-up"),
    EDGE_CONFIG: z.string().url().optional().default("https://edge.clerk.dev"),
    AUTH_SECRET: z.string({
      required_error:
        "AUTH_SECRET  is required. This is a secret key used to sign and verify JWT tokens. It should be a long, seemingly random string.",
    }),
    DISCORD_APP_TOKEN: z
      .string({
        required_error:
          "DISCORD_APP_TOKEN is required. Visit https://discord.com/developers/applications -> Your bot -> Bot -> Token",
      })
      .min(
        1,
        "DISCORD_APP_TOKEN is required. Visit https://discord.com/developers/applications -> Your bot -> Bot -> Token",
      ),
    DISCORD_APP_ID: z
      .string({
        required_error:
          "DISCORD_APP_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID",
      })
      .min(
        1,
        "DISCORD_APP_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID",
      ),
    DISCORD_APP_PUBLIC_KEY: z
      .string({
        required_error:
          "DISCORD_APP_PUBLIC_KEY is required. Visit https://discord.com/developers/applications -> General information -> PUBLIC KEY",
      })
      .min(
        1,
        "DISCORD_APP_PUBLIC_KEY is required. Visit https://discord.com/developers/applications -> General information -> PUBLIC KEY",
      ),
    // DISCORD_BOT_TOKEN: z
    //   .string({
    //     required_error:
    //       "DISCORD_BOT_TOKEN is required. Visit https://discord.com/developers/applications -> Bot -> Token. This variable used only for register commands",
    //   })
    //   .min(
    //     1,
    //     "DISCORD_BOT_TOKEN is required. Visit https://discord.com/developers/applications -> Bot -> Token. This variable used only for register commands",
    //   ),
    ROOT_URL: z.string().url("ROOT_URL must be a valid URL").optional().default("http://localhost:8080"),
  },
  onInvalidAccess: (error) => {
    throw new Error(`❌ Attempted to access a server-side environment variable on the client: ${error}`);
  },
  onValidationError: (error) => {
    throw new Error(
      `❌ Invalid environment variables:\n\n${error.errors.map((e, i) => `❌[${i}]: ${e.message}`).join("\n")}\n`,
    );
  },
});
