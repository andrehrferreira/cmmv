const { createApp, eventHandler } = require('h3');

module.exports = app = createApp();

app.use(
  "/",
  eventHandler(() => "Hello world"),
);