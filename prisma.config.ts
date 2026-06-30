import { defineConfig, env } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  earlyAccess: true,
  datasource: {
    url: "file:./dev.db"
  }
});
