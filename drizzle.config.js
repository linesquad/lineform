import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://lineformdb_owner:LOarlz5hvy0J@ep-super-hat-a2nav12x.eu-central-1.aws.neon.tech/lineformdb?sslmode=require",
  },
});
