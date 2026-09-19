
const {Sequelize} = require('sequelize');
require('dotenv').config();

// Supabase requires TLS. Its certs are signed by a CA that isn't in
// Node's default bundle, so verification is relaxed unless a CA is
// supplied via DB_SSL_REJECT_UNAUTHORIZED=true.
const useSsl = process.env.DB_SSL !== 'false';
const sslOptions = useSsl ?
  {
    ssl: {
      require: true,
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
    },
  } :
  {};

const url = process.env.DATABASE_URL;

// Catch the two easy mistakes here, where the message can say what is
// wrong, rather than letting pg throw "Invalid URL" from deep in a stack.
if (url) {
  if (!/^postgres(ql)?:\/\//.test(url)) {
    throw new Error(
        'DATABASE_URL must be a Postgres connection string starting with ' +
        `postgresql:// -- got "${url}". The https://<ref>.supabase.co address ` +
        'is the API URL for supabase-js, not the database. Copy the URI from ' +
        'Supabase -> Connect -> Session pooler.',
    );
  }
  if (/[<>]/.test(url)) {
    throw new Error(
        'DATABASE_URL still contains <placeholders> -- fill in the real ' +
        'password and region from the Supabase dashboard.',
    );
  }
} else if (!process.env.DB_HOST) {
  throw new Error(
      'No database configured: set DATABASE_URL (Supabase) or DB_HOST in .env.',
  );
}

// A single connection string (Supabase gives you one) wins over the
// discrete DB_* vars, which still work for a local database.
const sequelize = url ?
  new Sequelize(url, {
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    dialectOptions: sslOptions,
  }) :
  new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false,
        dialectOptions: sslOptions,
      },
  );

module.exports = sequelize;
