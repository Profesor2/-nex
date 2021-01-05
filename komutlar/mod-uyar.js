const Discord = require('discord.js')
const data = require('quick.db')

exports.run = async (client, message, args) => {
let prefix = '!'

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Yetkin yok.`)
if(!args[0]) return message.channel.send(`<:No_proton:793094912215875606> ** ${prefix}warn \`add/delete/info\` Komutlarını Kullanmalısınız.**`)


if(args[0] === 'add') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`<:No_proton:793094912215875606> **Bir Kullanıcı Belirtmelisin.**`)
if(!kullanıcı) return message.channel.send(` ** <:No_proton:793094912215875606>  ${args[1]} Kullanıcısını Sunucuda Bulamıyorum.**`)
if(kullanıcı.bot) return message.channel.send(`<:No_proton:793094912215875606>  ** Botları Uyaramam.**`)
if(kullanıcı.id === message.author.id) return message.channel.send(`<:No_proton:793094912215875606>  **Kendini Uyaramazsın.**`)
let reason = args.slice(2).join(' ')

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, +1)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)

if(!reason) {
await message.channel.send(`** <:Yes_proton:793094873716490240>  ${kullanıcı} Uyarıldı! Toplam uyarı sayısı : \` ${syı} \`**`)
await kullanıcı.send(`<:wesu_icons_ban:794906807407083520>  ** ${kullanıcı} Merhaba! \` ${message.guild.name} \` Sunucusunda Sebepsiz Bir Şekilde Uyarıldın.** `) 
return}

if(reason) {
await message.channel.send(`** <:Yes_proton:793094873716490240>  ${kullanıcı} Uyarıldı! Toplam uyarı sayısı : ${syı} **`)
await kullanıcı.send(`**<:wesu_icons_ban:794906807407083520>  ${kullanıcı} Merhaba! \`${message.guild.name}\` Sunucusunda \`${reason}\` Sebebiyle Uyarıldın.**`) 
return} }

if(args[0] === 'delete') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`<:No_proton:793094912215875606>  **Bir Kullanıcı Belirtmelisin.**`)
if(!kullanıcı) return message.channel.send(`<:No_proton:793094912215875606>  **${args[1]}, Kullanıcısını Sunucuda Bulamıyorum.**`)
if(kullanıcı.id === message.author.id) return message.channel.send(`** <:No_proton:793094912215875606>  Kendini Uyaramazsın.**`)

let sayı = args[2]
if(!sayı) return message.channel.send(`<:No_proton:793094912215875606>  **Silinecek Uyarı Sayısını Yazmadın!**`)
if(isNaN(sayı)) return message.channel.send(`<:No_proton:793094912215875606> **Silinecek Uyarı Sayısını Yazmadın!**`)
if(sayı === '0') return message.channel.send(`** <:No_proton:793094912215875606> 0'dan Büyük Bir Sayı Silmelisin**`)
const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(syı2 < sayı) return message.channel.send(`** <:No_proton:793094912215875606>  ${kullanıcı} Kullanıcısının Uyarı Sayısı : \`${syı2}\` Sadece Bu Kadar Silebilirsin.**`)

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, -sayı)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
await message.channel.send(`** <:Yes_proton:793094873716490240>  ${kullanıcı} Uyarısı Silindi! Toplam Uyarı Sayısı : \` ${syı ? syı : '0'}\` ** `)
await kullanıcı.send(`${kullanıcı}, merhaba! ${message.guild.name} sunucusunda uyarın silindi. Daha dikkatli ol!`) }

if(args[0] === 'info') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) return message.channel.send(`**<:No_proton:793094912215875606>  Bir Kullanıcı Belirtmelisin.**`)
if(!kullanıcı) return message.channel.send(` ** <:No_proton:793094912215875606>  ${args[1]} Kullanıcısını Sunucuda Bulamıyorum.**`)

const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(!syı2) return message.channel.send(`<:Yes_proton:793094873716490240>  ** ${kullanıcı}, Kullanıcısının Hiç Uyarısı Yok.**`)
await message.channel.send(`<:Yes_proton:793094873716490240>  **  ${kullanıcı} : Toplam Uyarı Sayısı : \`${syı2 ? syı2 : '0'}\`** `) }
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['warn','Warn','Warned','WARN'],
permLevel: 0,
}

exports.help = {
name: 'warn'
}