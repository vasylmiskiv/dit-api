export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  mongodb: process.env.MONGODB_URI,
  jwtsecret: process.env.JWT_SECRET,
  news: process.env.NATURE_NEWS_URL,
  newskey: process.env.API_KEY,
});
