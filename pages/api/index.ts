import { ApolloServer } from 'apollo-server-micro'
import { GraphQLDateTime } from 'graphql-iso-date'
import apolloHandler from 'lib/apolloHandler'
import cors from 'micro-cors'
import { asNexusMethod, makeSchema } from 'nexus'
import path from 'path'

import Types from './graphql/types'
import Mutations from './graphql/mutations'
import Queries from './graphql/queries'

export const DateTime = asNexusMethod(GraphQLDateTime, 'date')

export const schema = makeSchema({
  types: [...Types, Queries, Mutations, DateTime],
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql')
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

const apolloServer = new ApolloServer({ schema })
const handler = (req, res) => apolloHandler(req, res, apolloServer)

export default cors()(handler)
