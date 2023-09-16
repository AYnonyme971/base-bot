const { Client, CommandInteraction } = require("discord.js");
const Bot = require("../structures/Bot");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {Bot} bot
     * @param {CommandInteraction} interaction
     */
    async execute(bot, interaction) {
        if (interaction.isChatInputCommand()) {
            const command = bot.commands.get(interaction.commandName);
            if (!command)
                return await interaction.reply({
                    ephemeral: true,
                    content: "La commande n'existe plus.",
                });
            command.execute(bot, interaction);
        }
    },
};
