const fs = require("node:fs");
const path = require("node:path");

module.exports = (client, Discord) => {
  const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    if (command.name) {
      client.command.set(command.name, command);
    } else {
      continue;
    }
  }
};
