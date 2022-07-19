const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  env: {
    email: "radko@abv.bg",
    password: "radko123",
  },
});
