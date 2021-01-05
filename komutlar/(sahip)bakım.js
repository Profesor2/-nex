const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayar.json")
exports.run = async (client, message, args) => {
  
  if(message.author.id !== ayarlar.sahip) {
     const embed = new Discord.MessageEmbed()
    .setDescription(`**<:No_proton:793094912215875606>  Bu Komut Yapımcıma Özel**`)
    .setColor('BLUE')
    }
if(args[0] === "aç"){
  if(!args[1]){
  message.channel.send('**<:No_proton:793094912215875606>  Bakım Modu Sebebini Belirtiniz.**')
  }
  db.set('bakım', args.slice(1).join(' '))
  if (args.slice(1).join(' ')) {
  message.channel.send("** <:Yes_proton:793094873716490240>  Bakım Modu Açıldı**")
    }
} else if(args[0]=== "kapat"){
  message.channel.send("** <:Yes_proton:793094873716490240>  Bakım Modu Kapatıldı**")
  db.delete('bakım')
}

}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bakım',
  description: 'Bakım.',
  usage: 'Bakım'
};