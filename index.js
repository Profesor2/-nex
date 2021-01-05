const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

console.log("Youtube = PYTHONIC")
console.log( ayarlar.isim + " botu acildi!")
console.log("-----------------------")


client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip, ayarlar.sahip2) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

////////////////////////////////////////GOLD ÜYE KOMUTU

client.on("message", (message) => { const db = require('quick.db')
  const goldUyeler = ["750319076429135923"];
  if(goldUyeler.includes(message.author.id) && (!db.has(`goldbildirim.${message.author.id}`) || (db.get(`goldbildirim.${message.author.id}`) + (1 * 60 * 60 * 1000)) < Date.now())) {
    const embed = new Discord.MessageEmbed();
    embed.setDescription("**İnex'in (G)old Üyesi Belirdi <a:Gold_proton:793094441899786261> ** <@" + message.author.id + ">");
    embed.setColor(0x00FFFF);
    message.channel.send(embed).then((msg) => msg.delete({timeout: 90000}));
    db.set(`goldbildirim.${message.author.id}`, Date.now());
  }
});

/////////////////////////////////////////OTO CEVAP SİSTEMİ

client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "<@776132097542848542>") {
    krevzmesaj.channel.send(
      "** Merhaba Dostum Komutlarıma Erişmek İçin \`!yardım\`"
    );
  }
});
///OTO 1
client.on("message", krevzmesaj => {
  if (krevzmesaj.content.toLowerCase() === "Sahibim") {
    krevzmesaj.channel.send(
      "<@750319076429135923>"
    );
  }
}); 
///OTO 2