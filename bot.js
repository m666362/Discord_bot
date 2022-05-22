require("dotenv").config();
const { Client } = require("discord.js");
const { PREFIX, ModMe } = require("./Constant");
const commandHandlerForCommandName = require("./GlobalFunction");
const { addUser } = require("./GlobalFunction");
const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("message", async (msg) => {
  // Check bot is mentioned or not
  const wasBotMentioned = msg?.mentions?.users?.get(client.user.id)
    ? true
    : false;
  if (wasBotMentioned) {
    return commandHandlerForCommandName?.present(msg);
  }

  // Ignore bot's message
  if (msg?.author?.bot) {
    return;
  }

  // Ignore any messages sent as direct messages.
  // The bot will only accept commands issued in a guild.
  if (!msg.channel.guild && msg.content !== undefined) {
    return commandHandlerForCommandName?.banDM(msg);
  }

  // Ignore any message that doesn't start with the correct prefix.
  if (!msg?.content?.startsWith(PREFIX)) {
    return commandHandlerForCommandName?.commandNotMentioned(msg);
  }
});

// console.log(`${PREFIX}${ModMe}`);

client.login(process.env.BOT_TOKEN);
