const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("quit")
    .setDescription("Quit voice channel"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!")
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    {
      body: commands
    }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
