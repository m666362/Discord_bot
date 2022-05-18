require("dotenv").config();
const { Client } = require("discord.js");
const { BotPrefix, ModMe } = require("./Constant");
const { addUser } = require("./GlobalFunction");
const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("message", (msg) => {
  if (msg.content === `${BotPrefix}${ModMe}`) {
    addUser(msg.member)
  }
});

console.log(`${BotPrefix}${ModMe}`);

client.login(process.env.BOT_TOKEN);
