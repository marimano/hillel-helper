import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();

server.register(fastifyStatic, {
  root: path.join(__dirname, '../dist')
})

server.listen({ port: 5678 })
  .then(() => {
    console.log('Server started')
  })
  .catch((error) => {
    console.log('Error', error)
  })