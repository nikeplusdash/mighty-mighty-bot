const commands = require('../commands')
const utils = require('../utils/utils')

let message = (client, message) => {
    if (message.author.bot) return
    if (!message.guild) {
        //any user DM based function
        client.logger.log(`${message.author.username} has DM'ed the bot`)
    }
    message.prefix = client.prefix.ensure(message.guild.id, 'm!')
    if (message.content.indexOf(message.prefix) !== 0) {
        utils.levelUp(client,message,Math.floor(Math.random()*15))
        utils.handleResponse(client,message)
    }
    let args = message.content.slice(message.prefix.length).trim().split(/ +/g)
    let command = commands[args[0].toLowerCase()] === undefined ? args.shift().toLowerCase() : commands[args.shift().toLowerCase()]
    const cmd = client.commands.get(command);
    if (!cmd && !message.mentions.everyone && message.mentions.users.first() == client.user.id) {
        message.channel.send(`\`Use ${message.prefix}help to get the command list\``)
    }
    if (!cmd) return;
    cmd.run(client, message, args);
}

module.exports = message