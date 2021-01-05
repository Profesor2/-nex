const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayar.json')
exports.run = (client,message,args)=>{

    if(message.author.id !== "750319076429135923") return message.channel.send('Bu komut sahibimin komudu. Bunu kullanmak için izniniz yok!!')
    let user = message.mentions.users.first() || client.users.cache.get(args[0])
    let reason = args.slice(1).join(' ')
    if(!user) return message.channel.send('<:No_proton:793094912215875606> **Karalisteye Almam İçin Bir Kullanıcı Etiketleyiniz**')
if(!reason) return message.channel.send('<:No_proton:793094912215875606>  **Lütfen Bir Sebep Belirtiniz.**')

    db.set(`kliste.${user.id}`, reason);
    message.channel.send(`** <:Yes_proton:793094873716490240>  \` ${user.tag}  \` Adlı kişi \` ${reason || 'Sebep belirtilmemiş'} \` Sebebinden Karalisteye Alındı.**`)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["karaliste"],
  permLvl: 0,
};
exports.help ={
    name:'karaliste',
    aliases:['k'],
    description:'Kullanıcıyı karalisteye alır.',
  
}