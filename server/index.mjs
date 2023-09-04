import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url'
import { WebSocketServer } from 'ws'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();

const wss = new WebSocketServer({ server: server.server })

wss.on('connection', client => {
  console.log('----NEW CLIENT CONNECTED')

  client.on('message', data => {
    console.log('GOT MESSAGE', data.toString())
    wss.clients.forEach(otherClient => {
      const sender = otherClient === client ? 'you' : 'another client'
      otherClient.send(`Message from ${sender}: ` + data) 
    })
  })

  client.on('close', () => {
    console.log('----CLIENT DISCONNECTED')
  })
})

server.setNotFoundHandler((_, reply) => {
  return reply.sendFile('index.html')
})

server.register(fastifyStatic, {
  root: path.join(__dirname, '../dist')
})

const port = process.env.PORT || 5679;
const host = process.env.HOST || 'localhost'

server.listen({ port, host })
  .then((address) => {
    console.log('Server started: ' + address)
  })
  .catch((error) => {
    console.log('Error', error)
  })