const ayarlar = require("../ayar.json");
const db = require("quick.db");
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  });
  let client = message.client;
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  let karaliste = db.fetch(`kliste.${message.author.id}`); const Discord=require("discord.js");
   const aa = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('HATA')
    .setDescription('** <:No_proton:793094912215875606>  \`Botun Karalistesinde Bulunuyorsunuz\`**')
    .addField('<:wesu_icons_ban:794906807407083520>  Kara Listeye Alınma Sebebin', karaliste)
   if(karaliste) return message.channel.send(aa)
  if (cmd) {
      let bakım = db.fetch('bakım');
  if(message.author.id !== ayarlar.sahip){
  if(bakım){
 return message.channel.send(`**<:wesu_icons_ban:794906807407083520>  Sizlere En İyi Hizmeti Verebilmek İçin Bakımdayız.\n\n<:wesu_icons_bakim:794906837949480980>  Bakım Sebebi: \`${bakım}\`**`)
     }
    }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
