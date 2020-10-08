exports.run = (client, message, args) => {
    message.channel.send('Pong!')
}

exports.help = {
    name: 'ping',
    alias: ['ping','!'],
    category: 'Info',
    description: `Ping it and it'll pong back`,
    usage: 'ping'
};