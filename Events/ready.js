const { ActivityType } = require("discord.js");
const Bot = require("../structures/Bot");

module.exports = {
    name: "ready",
    once: true,
    /**
     *
     * @param {Bot} bot
     */
    async execute(bot) {
        setInterval(() => {
            bot.user.setPresence({
                activities: [
                    {
                        name: `✨ Je suis sur ${bot.guilds.cache.size} serveurs.`,
                        type: ActivityType.Custom,
                    },
                ],
            });
        }, 500);
    },
};
