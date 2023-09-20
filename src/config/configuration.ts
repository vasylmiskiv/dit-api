import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  mongodb: process.env.MONGODB_URI,
  jwtsecret: process.env.JWT_SECRET,
  news: process.env.NATURE_NEWS_URL,
  newskey: process.env.API_KEY,
}));
