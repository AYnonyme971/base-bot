const { SlashCommandBuilder, CommandInteraction } = require("discord.js");
const Bot = require("../../structures/Bot");

module.exports = {
    name: "ping",
    description: "Ping",
    /**
     *
     * @param {Bot} bot
     * @param {CommandInteraction} interaction
     */
    async execute(bot, interaction) {
        let ping = bot.ws.ping;
        interaction.reply({
            content: `**${ping}ms**`,
        });
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    },
};
