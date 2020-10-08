const commands = require('../commands')
const constants = require('../constants')

exports.run = (client, message, args) => {
    if (!args[0]) {
        let commands = client.commands
        let commandNames = commands.keyArray()
        let output = {}
        let sorted = commands.array().sort((i, j) => i.help.name > j.help.name)
        sorted.forEach(i => {
            if (output[i.help.category] === undefined) output[i.help.category] = []
            output[i.help.category].push(i.help.name)
        })
        let fieldInput = []
        // ,inline: true
        for (const i in output) {
            fieldInput.push({ name: i, value: output[i].join(', ')})
        }
        message.channel.send({
            embed: {
                color: constants.HELP,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL()
                },
                description: `Use ${message.prefix}help [command] for details`,
                timestamp: message.createdAt,
                fields: fieldInput,
            }
        })
    }
    else {
        command = args[0]
        if(commands[command] !== undefined) command = commands[command]
        if (client.commands.has(command)) {
            command = client.commands.get(command)
            message.channel.send({
                embed: {
                    color: constants.HELP,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL()
                    },
                    // title: command.help.name[0].toUpperCase() + command.help.name.slice(1),
                    description: command.help.description,
                    fields: [
                        {
                            name: 'Aliases',
                            value: command.help.alias.join(', '),
                            inline: true
                        },
                        {
                            name: 'Usage',
                            value: `${message.prefix}${command.help.usage}`,
                            inline: true
                        }
                    ],
                    timestamp: message.createdAt,
                }
            })
        }
    }
}

exports.help = {
    name: 'help',
    alias: ['help','h','?'],
    category: 'Info',
    description: 'Displays all the available commands',
    usage: 'help [command]'
};