const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials,
    REST,
    Routes,
} = require("discord.js");
const fs = require("fs");

class Bot extends Client {
    constructor() {
        super({
            intents: Object.values(GatewayIntentBits),
            partials: Object.values(Partials),
        });
        this.token = require("../config.json").token;
        this.owners = require("../config.json").owners;
        this.commands = new Collection();
        this.sCommands = [];
        this.botId = "bot id";
    }
    init() {
        const eventFiles = fs.readdirSync("./Events");
        for (const file of eventFiles) {
            const event = require(`../Events/${file}`);
            if (!event.name || !event.execute)
                console.log("Missing name and/or proprety to " + file);
            event.once
                ? this.once(event.name, (...args) =>
                      event.execute(this, ...args)
                  )
                : this.on(event.name, (...args) =>
                      event.execute(this, ...args)
                  );
            console.log(`Loaded ${event.name} (${file})`);
        }
        const commandDirs = fs.readdirSync("./Commands");
        for (const dir of commandDirs) {
            for (const file of fs.readdirSync(`./Commands/${dir}`)) {
                const command = require(`../Commands/${dir}/${file}`);
                this.commands.set(command.name, command);
                if (command.data) this.sCommands.push(command.data.toJSON());
                console.log(`Command ${command.name} loaded! (${file})`);
            }
        }
        this.registerSlashs(this.sCommands, true);
        this.login(this.token).catch((err) => {
            console.log("Verifiy your token!");
            console.error(`ERROR! ${err}`);
        });
    }
    async registerSlashs(commands, reset = false, reload = false) {
        const rest = new REST().setToken(this.token);

        if (reset) {
            let slashs = await rest.put(
                Routes.applicationCommands(this.botId),
                {
                    body: commands,
                }
            );
            console.log(`Loaded ${slashs.length} commands!`);
        } else {
            let Scommands = [];
            rest.put(Routes.applicationCommands(this.botId), {
                body: Scommands,
            });
            console.log("Resetted slash commands.");
            if (reload) {
                rest.put(Routes.applicationCommands(this.botId), {
                    body: commands,
                });
            }
        }
    }
}

module.exports = Bot;
