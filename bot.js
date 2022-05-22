// Require the necessary discord.js classes
require("dotenv").config()
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Logged in as ${client.user.username}!`);
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
