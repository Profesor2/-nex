const Discord = require('discord.js');
const prefix = process.env.PREFIX;

module.exports = client => {
client.user.setActivity('Bakımda', {type: 'WATCHING'}); 

}