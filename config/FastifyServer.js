const fastify = require('fastify')({
    logger: true,
    trustProxy: true
})
const path = require('path');
const { initAllRoutes } = require('./RoutesConfig');
const start = async () => {
    try {
        await fastify.listen(process.env.PORT, '0.0.0.0')
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
exports.initServer = () => {
    fastify.register(require('@fastify/websocket'))
    fastify.register(async function (fastify) {
        fastify.get('/soccket', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
            connection.socket.send('hi from server')
        })
      })
    fastify.get('/', async (request, reply) => {
        return reply.send({ message: "Server Online" })
    })
    initAllRoutes(fastify)
    start()
} 