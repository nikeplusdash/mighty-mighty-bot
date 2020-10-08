const number = {
    '0': ':zero:',
    '1': ':one:',
    '2': ':two',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:'
}

exports.run = (client,message,args) => {
    if(!args[0]) return
    else {
        let text = args.join(' ').toLowerCase().split('')
        let output = ''
        for(const i of text) {
            if(i === ' ') output += '  '
            else if(number[i] !== undefined) output += number[i] + ''
            else output += `:regional_indicator_${i}:`
        }
        message.delete().catch(err => client.logger.error(err))
        message.channel.send(output)
    }
}   

exports.help = {
    name: 'big',
    alias: ['big'],
    category: 'Fun',
    description: 'Displays message in BIG LETTERS',
    usage: 'big [message]'
};