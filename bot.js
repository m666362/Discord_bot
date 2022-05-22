require("dotenv").config();
const { Client } = require("discord.js");
const { PREFIX, BOT_OWNER_ID } = require("./Constant");
const commandHandlerForCommandName = require("./CommandFunctions");
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
  if (!msg?.content?.startsWith("pb!")) {
    console.log(msg?.content?.startsWith(PREFIX));
    return commandHandlerForCommandName?.commandNotMentioned(msg);
  }

  // Extract the parts of the command and the command name
  const parts = msg?.content
    ?.split(" ")
    .map((s) => s.trim())
    .filter((s) => s);
  const commandName = parts[0].substr(PREFIX.length);
  console.log(parts, commandName);

  // Separate the command arguments from the command prefix and command name.
  const args = parts.slice(1);

  // Get the appropriate handler for the command, if there is one.
  const commandHandler = commandHandlerForCommandName[commandName];
  if (!commandHandler) {
    console.log("returning from commandHandler");
    return;
  }

  const authorIsBotOwner = msg.author.id === BOT_OWNER_ID;
  if (commandHandler.botOwnerOnly && !authorIsBotOwner) {
    return await msg.reply(
      "Hey, only my owner can issue that command!"
    );
  }

  try {
    await commandHandler.execute(msg, args);
  } catch (err) {
    console.warn("Error handling command");
    console.warn(err);
  }
});

// console.log(`${PREFIX}${ModMe}`);

client.login(process.env.BOT_TOKEN);
