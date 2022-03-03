// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const {
  addSpeechEvent,
  resolveSpeechWithWitai
} = require("discord-speech-recognition");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

addSpeechEvent(client);

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, member, guild } = interaction;
  const voiceChannel = member.voice.channel;
  if (commandName === "ping") {
    await interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`);
  } else if (commandName === "quit") {
    console.log("Exiting channel");
    const connection = getVoiceConnection();
    console.log(connection);
    connection.destroy();
  } else if (commandName === "user") {
    await interaction.reply("Joining voice channel...");
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false
    });
  }
});

client.on("speech", async (msg) => {
  const channel = await client.channels.fetch("698582018061238334");
  console.log(msg.content);
  if (msg.content == null) {
    console.log("Couldn't understand message");
    return;
  }
  if (msg.content.includes("stop")) {
    channel.send("-stop");
  }
  if (!msg.content.includes("play")) {
    console.log("Didn't say play");
    return;
  }
  channel.send(`-${msg.content}`);
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
