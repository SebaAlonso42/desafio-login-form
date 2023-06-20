import dotenv from "dotenv";
dotenv.config();

const config = {
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  appID: process.env.APP_ID,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: process.env.CALLBACK_URL,
};

export default config;
