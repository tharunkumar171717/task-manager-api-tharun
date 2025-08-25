require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 4000,
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
    DIALECT: process.env.DB_DIALECT,
  },
  JWT_SECRET: process.env.JWT_SECRET,
};
