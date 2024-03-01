const { Client, GatewayIntentBits, User, userMention } = require("discord.js");

require('dotenv').config();


const client = new Client({ intents: 
    [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent] });

client.on("messageCreate", (message) => {

    if(message.author.bot) return;
    message.reply({
        content: "Hey i am Genius Bot, How Can I help you !",
    })
});

client.login(process.env.TOKEN);