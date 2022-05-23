// Require the necessary discord.js classes
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const Discord = require("discord.js");
const { Intents } = require("discord.js");

// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
let client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [Intents.FLAGS.GUILDS]});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlerPath = path.join(__dirname, "handler");
const handlerFiles = fs
  .readdirSync(handlerPath)
  .filter((file) => file.endsWith(".js"));


for (const file of handlerFiles) {
  const filePath = path.join(handlerPath, file);
  require(filePath)(client, Discord);
}

client.login(process.env.token);
