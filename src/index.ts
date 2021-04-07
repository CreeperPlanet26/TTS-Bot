//@ts-nocheck
import "dotenv/config";
import { client } from "./client/Client";
import { join } from "path";
import { BaseCommand } from "./commands/baseCommand/BaseCommand";
import { BaseEvent } from "./events/baseEvent/BaseEvent";

BaseCommand.register(join(__dirname, "commands"));
BaseEvent.register(join(__dirname, "events"));

client.on("ready", () => {
  client.api.applications(client.user.id).commands.post({
  data: {
    name: "ping",
    description: "Gets your ping to TTS Bot",
  },
});

client.ws.on("INTERACTION_CREATE", async interaction => {
  // Do stuff here - interaction is an InteractionResponse object. To get the name, use interaction.data.name
  // In particular, the values you passed to the interaction when creating it will be passed back here
  
  if (interaction.data.name === "ping") {
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
      type: 4,
      data: {
       content: client.ws.ping,
       "allowed_mentions": { "parse": [] }
       },
      },
    });
  }
  });
  console.log(client.api.interactions(interaction.id, interaction.token))
})
