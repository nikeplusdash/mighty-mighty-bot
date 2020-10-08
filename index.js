const Discord = require('discord.js')
const Enmap = require("enmap");
const fs = require("fs");
const logger = require('./logger')
require('dotenv').config()

const client = new Discord.Client()
client.commands = new Enmap()
client.prefix = new Enmap({name: 'prefix'})
client.points = new Enmap({name: 'points'})
client.points = new Enmap({name: 'status'})
client.inventory = new Enmap({name: 'inventory'})
client.investments = new Enmap({name: 'investments'})
client.logger = logger

fs.readdir("./events/", (err, files) => {
	if (err) return client.logger.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
	});
});

fs.readdir("./commands/", (err, files) => {
	if (err) return client.logger.error(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		let data = require(`./commands/${file}`);
		let commandName = file.split(".")[0];
		client.commands.set(commandName, data);
	});
});

// For testing
// 
// client.on('message', (message) => {
// 	message.channel.send({embed:{}})
// 	message.reactions.re
// })

client.login(process.env.BOT_TOKEN)