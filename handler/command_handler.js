const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

// env file data
const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.token;

module.exports = (client, Discord) => {
  const commandPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));

  const commands = [];
  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    commands.push(command.data.toJSON());
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
  }

  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
};
