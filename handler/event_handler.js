const fs = require("node:fs");
const path = require("node:path");

module.exports = (client, Discord) => {
  const eventPath = path.join(__dirname, "../events");
  const eventFiles = fs
    .readdirSync(eventPath)
    .filter((file) => file.endsWith(".js"));

  console.log(eventPath, eventFiles);
  for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};
