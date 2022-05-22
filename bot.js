require("dotenv").config();
const { Client } = require("discord.js");
const { PREFIX, ModMe } = require("./Constant");
const { addUser } = require("./GlobalFunction");
const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("message",async (msg) => {
  const wasBotMentioned = msg?.mentions?.users?.get(client.user.id)
    ? true
    : false;
  if (wasBotMentioned) {
    try {
      msg.reply("I am here for your service. How can I help you?");
    } catch (error) {
      console.warn("Failed to respond to mention.");
      console.warn(error);
    }
  }

  // Ignore bot message
  if (msg?.author?.bot) {
    return;
  }

  // Ignore any messages sent as direct messages.
  // The bot will only accept commands issued in
  // a guild.
  if (!msg.channel.guild && msg.content!==undefined) {
    try {
      console.log(msg.content);
      return await msg.reply("I was told not to reply personally");
    } catch (error) {
      console.warn("Failed to respond to mention.");
      console.warn(error);
    }
  }

  if (msg.content === `${PREFIX}${ModMe}`) {
    addUser(msg.member);
  }
});

// console.log(`${PREFIX}${ModMe}`);

client.login(process.env.BOT_TOKEN);
