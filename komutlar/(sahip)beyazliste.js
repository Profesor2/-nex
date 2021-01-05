const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayar.json')
exports.run = (client,message,args)=>{

    if(message.author.id !== "750319076429135923") return message.channel.send(' <:No_proton:793094912215875606>  **Bu Komut Botumuzun Yapımcılarına Özel.**')
    let user = message.mentions.users.first() || client.users.cache.get(args[0])
    if(!user) return message.channel.send('<:No_proton:793094912215875606>  **Beyaz Listeye Almam İçin Bir Kullanıcı Etiketleyiniz.**')

    db.delete(`kliste.${user.id}`);
    message.channel.send(`<:Yes_proton:793094873716490240>  ** \` ${user.tag} \` Adlı Kişi Beyaz Listeye Alınmıştır.**`)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["beyazliste"],
  permLvl: 0,
};
exports.help ={
    name:'beyazliste',
    aliases:['bl'],
    description:'Kullanıcıyı beyazlisteye alır.',
}