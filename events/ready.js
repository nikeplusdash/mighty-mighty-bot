module.exports = (client) => {
    if (process.env.NODE_ENV === 'development') {
        client.user.setActivity('with my life')
        client.logger.debug(`Setting Up Bot status to ${process.env.NODE_ENV}`)
    }
    else {
        client.user.setActivity('over your life', { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'STREAMING' })
        client.logger.ready(`Setting Up Bot status to ${process.env.NODE_ENV}`)
    }
}