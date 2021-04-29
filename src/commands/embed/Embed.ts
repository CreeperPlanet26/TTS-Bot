import { Embed } from "../../client/embeds/Embed";
import { BaseCommand } from "../baseCommand/BaseCommand";
import { Activator } from "../baseCommand/BaseCommandOptions";

export default class EmbedCommand extends BaseCommand {

    constructor() {
        super({
            name: "Embed",
            info: "test for embed class",
            type: "test",
            activator: Activator.STARTS_WITH,
        })
    }

    public async run(): Promise<void> {
        new Embed()
            .setTitle(this.options.name)
            .setDescription(this.options.info)
            .addField("Name", this.options.name)
            .addField("Info", this.options.info)
            .addField("Type", this.options.type)
            .addField("Activator", this.options.activator.toString())
            .sendTo(this.message.channel);


        require("axios").get("https://fortnite-api.com/v2/cosmetics/br").then(r => {
            const missing = [];
            r.data.data.forEach((c, i) => {
                console.log(i)
                const date = new Date(c.shopHistory && c.shopHistory[c.shopHistory.length - 1])

                const differenceInDays = (Date.now() - date.getTime()) / (1000 * 3600 * 24);
                console.log(date, differenceInDays)
                if (differenceInDays >= 300) missing.push(c)
            })

            console.log(`missing: ${missing}`)
            missing.forEach(e => this.message.channel.send(`Missing ${e.name}. Last Seen: ${new Date(e.shopHistory[e.shopHistory.length - 1]).toLocaleString()}`))
        })


    }

}
