const constants = require('../constants')

exports.run = (client, message, args) => {
    const filter = (reaction, user) => {
        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    }

    if (!args[0]) {
        message.channel.send({embed:{color: constants.ERROR,description: 'Please enter appropriate argument'}})
    }
    else if(args[0] === client.prefix.get(message.guild.id)) {
        message.channel.send({embed:{color: constants.ERROR,description: 'Cannot change to same prefix'}})
    }
    else {
        message.channel.send({
            embed: {
                color: constants.ALERT,
                description: `Are you sure you want to change the prefix from **${client.prefix.get(message.guild.id)}** to **${args[0]}**`,
                footer: {text: 'React within 15s'}
            }
        })
            .then(msg => {msg.react('👍'); msg.react('👎');return msg})
            .then(msg => {
                msg.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '👍') {
                            client.prefix.set(message.guild.id, args[0])
                            msg.edit({embed:{color: constants.SUCCESS,description: `The prefix has been changed to **${args[0]}**`}})
                        } else {
                            msg.edit({embed:{description: 'The prefix was not changed'}})
                                .then(m => {m.reactions.removeAll();return m})
                                .then(m => m.delete({timeout: 5000}))
                        }
                    })
                    .catch(collected => {
                        msg.edit({embed:{color: constants.ERROR,description: 'No valid reaction'}})
                    })
            })
    }
}

exports.help = {
    name: 'setprefix',
    alias: ['setprefix'],
    category: 'Info',
    description: `Change the prefix to a desirable one`,
    usage: 'setprefix [prefix]'
};