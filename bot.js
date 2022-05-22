require("dotenv").config();
const { Client } = require("discord.js");
const { PREFIX, ModMe } = require("./Constant");
const { addUser } = require("./GlobalFunction");
const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("message", (msg) => {
  const wasBotMentioned = msg?.mentions?.users?.get(client.user.id)? true:false;
  if (wasBotMentioned) {
    try {
      msg.reply("I am here for your service. How can I help you?");
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
