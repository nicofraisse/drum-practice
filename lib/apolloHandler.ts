import { NextApiHandler } from 'next'

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler(apolloServer) {
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: '/api'
    })
  }

  return apolloServerHandler
}

const apolloHandler: NextApiHandler = async (req, res, server) => {
  const apolloServerHandler = await getApolloServerHandler(server)

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default apolloHandler
