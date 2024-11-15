import { Dialect } from 'sequelize';

export const config: any = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'tshirt_brand_dev',
    host: process.env.MYSQL_HOST,
    dialect: 'mysql' as Dialect,
  },
  staging: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'tshirt_brand_stag',
    host: process.env.MYSQL_HOST,
    dialect: 'mysql' as Dialect,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'tshirt_brand_prod',
    host: process.env.MYSQL_HOST,
    dialect: 'mysql' as Dialect,
  },
};
