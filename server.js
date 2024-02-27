import bodyParser from "body-parser";
import express from "express";
import sequelize from "./config/database.config.js";
import userRoutes from "./routers/userRoutes.js";
import roleRoutes from "./routers/roleRoutes.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// app.use('/auth', authRoutes);
// app.use('/:tenantId', setTenantContext, tenantRoutes);

app.use("/user", userRoutes, roleRoutes);
app.use("/role", roleRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
