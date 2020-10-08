const constant = require('../constants')

const moneyDeno = (money) => {
    if(money <= 999) return money
    if(money <= 99999) return (money/1000).toFixed(2) + 'K'
    if(money <= 9999999) return (money/100000).toFixed(2) + 'L'
    if(money <= 999999999) return (money/10000000).toFixed(2) + 'C'
    let moolah = String(money)
    return moolah.substr(0,2) + '+E' + moolah.length
}

exports.run = (client,message,args) => {
    let key = `${message.guild.id - message.author.id}`
    if(args[0] && args[0].toLowerCase() === 'create') require('../utils/utils').createProfile(client,message,key)
    if(!client.points.has(key)) {
        message.channel.send({
            embed: {
                color: constant.ERROR,
                description: `First create a profile with **${client.prefix.get(message.guild.id)}profile create**`
            }
        })
    }
    else {
        let user = message.mentions.users.first()
        if(user && user.bot == true) return 
        if(user) {key = `${message.guild.id - user.id}`;if(!client.points.has(key)) {message.channel.send(`${user.username} does not have a profile`);return}}
        const userData = client.points.get(key)
        message.channel.send({
            embed: {
                color: constant.BANNER,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL()
                },
                fields: [
                    {
                        name: 'Coins',
                        value: `₹${moneyDeno(userData.coins)}`,
                        inline: true
                    },
                    {
                        name: 'Bank',
                        value: `₹${moneyDeno(userData.bank)}`,
                        inline: true
                    },
                    {
                        name: 'Net Worth',
                        value: `₹${moneyDeno(userData.coins + userData.bank)}`,
                        inline: true
                    },
                    {
                        name: 'Health',
                        value: `${userData.health}`,
                        inline: true
                    },
                    {
                        name: 'Level',
                        value: `${userData.level}`,
                        inline: true
                    },
                    {
                        name: 'XP',
                        value: `${userData.exp}`,
                        inline: true
                    },
                    {
                        name: 'Debt',
                        value: `${userData.debt}`,
                        inline: true
                    }
                ],
                image: message.author.avatarURL()
            }
        })
    }
}

exports.help = {
    name: 'profile',
    alias: ['profile','p'],
    category: 'Economy',
    description: `Check your MIT profile`,
    usage: 'profile [prefix]'
};