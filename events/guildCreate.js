let guildCreate =(client,guild) => {
    client.logger.ready(`${client.user.username} has joined ${guild} with ID:${guild.id}`)
}

module.exports = guildCreate