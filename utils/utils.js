const message = require("../events/message");
const sendResponse = {
    'oye': 'Oye chal DeeTee',
    'abbe': 'Abbe chal DeeTee',
    'mighty mighty': ':regional_indicator_m::regional_indicator_i::regional_indicator_t:'
}

exports.levelUp = (client, message,points) => {
    const key = `${message.guild.id - message.author.id}`
    if (client.points.has(key)) {
        client.points.math(key, '+', points, 'exp')
        let curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, 'exp')))
        if (client.points.get(key, 'level') < curLevel) {
            message.reply(`You've leveled up to Lv.**${curLevel}**`);
            client.points.set(key, curLevel, 'level');
        }
    }
}

exports.handleResponse = (client,message) => {
    // add some nlp.js shit
    for (const msg in sendResponse) {
        if (message.content.toLowerCase().indexOf(msg) !== -1) {
            message.channel.send(sendResponse[msg])
            return
        }
    }
    return
}

exports.createProfile = (client,message,key) => {
    if(client.points.has(key)) {message.channel.send(`Account has already been created <@${message.author.id}>`);return}
    client.points.ensure(key, {
        user: message.author.id,
        guild: message.guild.id,
        debt: 0,
        coins: 1000,
        bank: 0,
        health: 100,
        level: 1,
        exp: 0
    })
    client.inventory.ensure(key, {
        consumme: [],
        item: []
    })
    message.channel.send(`Account has been created <@${message.author.id}>`)
}