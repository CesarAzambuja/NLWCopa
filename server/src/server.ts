import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'



import { poolRoutes } from './routes/pool'
import { userlRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { gameRoutes } from './routes/game'
import { authRoutes } from './routes/auth'


async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    try {
        await fastify.register(cors, {
            origin: true,
        })

        //Quando em produção a secret precisa ser uma variavel de ambiente.

        await fastify.register(jwt, {
            secret: 'nlwcopa',
        })

        await fastify.register(poolRoutes);
        await fastify.register(authRoutes);
        await fastify.register(gameRoutes);
        await fastify.register(guessRoutes);
        await fastify.register(userlRoutes);


        await fastify.listen({ port: 3333, host: '0.0.0.0' })
    
    }    catch (err){
        fastify.log.error(err)

        process.exit(1)
    }
}

bootstrap()