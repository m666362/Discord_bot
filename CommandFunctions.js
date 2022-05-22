const { newRole } = require("./Constant");
const updateMemberRoleForDonation = require("./HelperFunction");

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
    // console.warn("Failed to respond to mention.");
    console.warn(error);
  }
};

commandHandlerForCommandName["addpayment"] = {
  botOwnerOnly: true,
  execute: (msg, args) => {
    const mention = args[0];
    const amount = parseFloat(args[1]);
    const guild = msg.channel.guild;
    const userId = mention.replace(/<@(.*?)>/, (match, group1) => group1);
    const member = guild?.members?.get(userId);

    return Promise.all([
      msg.reply(`${mention} paid $${amount.toFixed(2)}`),
      // updateMemberRoleForDonation(guild, member, amount)
    ])

  },
};

module.exports = commandHandlerForCommandName;
