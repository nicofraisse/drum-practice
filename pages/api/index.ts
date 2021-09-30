import { ApolloServer } from 'apollo-server-micro'
import { DateTimeResolver } from 'graphql-scalars'
import apolloHandler from 'lib/apolloHandler'
import cors from 'micro-cors'
import { asNexusMethod, makeSchema } from 'nexus'
import { GraphQLDateTime } from 'graphql-iso-date'

import path from 'path'

import Mutations from './graphql/mutations'
import Queries from './graphql/queries'
import Models from './graphql/models'

// export const GQLDate = asNexusMethod(DateTimeResolver, 'date')
export const DateTime = asNexusMethod(GraphQLDateTime, 'date')

export const schema = makeSchema({
  types: [...Models, Queries, Mutations, DateTime],
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
