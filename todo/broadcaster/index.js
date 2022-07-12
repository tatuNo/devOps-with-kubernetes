import { connect, JSONCodec } from "nats";
import { Client, Intents } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
await client.login(process.env.DISCORD_TOKEN);

const nc = await connect({ servers: process.env.NATS_URL });

const jc = JSONCodec();

const sub = nc.subscribe('todo_data', { queue: 'broadcasters'});
(async () => {
  for await (const m of sub) {
    sendData(jc.decode(m.data));
  }
  console.log('subscription closed');
})();



const sendData = (msg) => {
  client.channels.fetch('996094588869689427')
    .then(channel => channel.send('```json\n' + JSON.stringify(JSON.parse(msg), null, 2) + '\n```'))
    .catch(error => console.log(error));
};
