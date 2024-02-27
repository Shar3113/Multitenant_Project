import { Sequelize } from "sequelize";
import config from "./config.js";

const { database, username, password, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host: host,

  dialect: dialect,

  logging: false,
});

// export const define = sequelize.define.bind(sequelize);
export default sequelize;
