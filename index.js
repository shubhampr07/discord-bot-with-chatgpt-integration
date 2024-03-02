const { Client, GatewayIntentBits, User, userMention } = require("discord.js");
const { OpenAI } = require("openai");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    
  ],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  language: "en",
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generating short id for" + url,
    });
  }

  //bot typing
  await message.channel.sendTyping();

  const sendTypingInterval = setInterval(() => {
    message.channel.sendTyping();
  }, 5000);



//response from chatgpt
  const response = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {role: 'user', content: message.content,}
    ],
    model: "gpt-3.5-turbo",
  }).catch((error) => console.error('Openai error', error));

  clearInterval(sendTypingInterval);

  if(!response) {
    message.reply("I am having some trouble while generating your request. Please try again after some time.");
    return;
  }

  message.reply(response.choices[0].message.content);
});



client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(process.env.TOKEN);
