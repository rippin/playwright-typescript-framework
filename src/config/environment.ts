import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

const environmentFile = resolve(process.cwd(), process.env.ENV_FILE ?? '.env');

if (existsSync(environmentFile)) {
  loadDotenv({ path: environmentFile, override: false, quiet: true });
}

const environmentSchema = z.object({
  TEST_ENV: z.enum(['local', 'test', 'staging', 'production']).default('test'),
  SAUCE_BASE_URL: z.string().url().default('https://www.saucedemo.com'),
  SAUCE_USERNAME: z.string().min(1).default('standard_user'),
  SAUCE_PASSWORD: z.string().min(1).default('secret_sauce'),
  BOOKER_BASE_URL: z.string().url().default('https://restful-booker.herokuapp.com'),
  BOOKER_USERNAME: z.string().min(1).default('admin'),
  BOOKER_PASSWORD: z.string().min(1).default('password123'),
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL: z.string().min(1).default('gpt-5.6-sol'),
});

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.issues
    .map((issue) => `${issue.path.join('.') || 'environment'}: ${issue.message}`)
    .join('\n');

  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const environment = Object.freeze(result.data);
export type Environment = typeof environment;
