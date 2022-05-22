const { newRole } = require("./Constant");

const commandHandlerForCommandName = {};
commandHandlerForCommandName["present"] = (msg) => {
  try {
    msg.reply("I am here for your service. How can I help you?");
  } catch (error) {
    console.warn("Failed to respond to mention.");
    console.warn(error);
  }
};

commandHandlerForCommandName["banDM"] = (msg) => {
  try {
    console.log(msg.content);
    return msg.reply("I was told not to reply personally");
  } catch (error) {
    console.warn("Failed to respond to mention.");
    console.warn(error);
  }
};

commandHandlerForCommandName["commandNotMentioned"] = (msg) => {
  try {
    return msg.reply("Command missing. Please check documentation");
  } catch (error) {
    console.warn("Failed to respond to mention.");
    console.warn(error);
  }
};

module.exports = commandHandlerForCommandName;
