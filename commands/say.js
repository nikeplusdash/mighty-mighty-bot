exports.run = (client,message,args) => {
    let text = args.join(' ')
    message.delete().catch(err => client.logger.error(err))
    message.channel.send(text)
}

exports.help = {
    name: 'say',
    alias: ['say','s'],
    category: 'Fun',
    description: `Your wish is my command`,
    usage: 'say [message]'
};