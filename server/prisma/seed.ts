import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/CesarAzambuja.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Poll',
            code: 'BOL123',
            ownerId: user.id,

            participants:  {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T18:00:00.201Z',
            firstTeamCountryCode: 'DE',
            secundTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-10T18:00:00.201Z',
            firstTeamCountryCode: 'BR',
            secundTeamCountryCode: 'AR',
            
            guesses: {
                create: {
                    firstTeamPoints: 3,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }

                }
            }

        },
    })
}

main()