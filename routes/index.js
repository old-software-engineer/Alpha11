const authRoutes = require("./auth");
const articleRoutes = require("./articles");

function routeConfig(app) {
  app.use("/auth", authRoutes);
  app.use("/", articleRoutes);
}

module.exports = routeConfig;
