const fs = require("node:fs");
const path = require("node:path");

module.exports = (client, Discord) => {
  const commandsPath = path.join(__dirname, "events");
  const commandFiles = fs
    .readdirSync('./events/')
    .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.commands.set(command.data.name, command);
      }
};