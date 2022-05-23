// Require the necessary discord.js classes
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const Discord = require("discord.js");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
client.events = new Collection();

const handlerPath = path.join(__dirname, "handler");
const handlerFiles = fs
  .readdirSync(handlerPath)
  .filter((file) => file.endsWith(".js"));

  handlerFiles.forEach(file=>{})

// for (const file of commandFiles) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   // Set a new item in the Collection
//   // With the key as the command name and the value as the exported module
//   client.commands.set(command.data.name, command);
// }

// ["command_handler", "event_handler"].forEach(handler=>{
// 	require(`./handler/${handler}`)(client, Discord)
// })

// const commandsPath = path.join(__dirname, "commands");
// const commandFiles = fs
//   .readdirSync(commandsPath)
//   .filter((file) => file.endsWith(".js"));

// for (const file of commandFiles) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   // Set a new item in the Collection
//   // With the key as the command name and the value as the exported module
//   client.commands.set(command.data.name, command);
// }

// module.exports = {client}

// When the client is ready, run this code (only once)
// client.once("ready", () => {
//   console.log(`Logged in as ${client.user.username}!`);
// });

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isCommand()) return;

//   const command = client.commands.get(interaction.commandName);

//   if (!command) return;

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({
//       content: "There was an error while executing this command!",
//       ephemeral: true,
//     });
//   }
// });

// const eventsPath = path.join(__dirname, "events");
// const eventFiles = fs
//   .readdirSync(eventsPath)
//   .filter((file) => file.endsWith(".js"));

// for (const file of eventFiles) {
//   const filePath = path.join(eventsPath, file);
//   const event = require(filePath);
//   if (event.once) {
//     client.once(event.name, (...args) => event.execute(...args));
//   } else {
//     client.on(event.name, (...args) => event.execute(...args));
//   }
// }

// Login to Discord with your client's token
client.login(process.env.token);
