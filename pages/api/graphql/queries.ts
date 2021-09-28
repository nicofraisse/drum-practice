import prisma from 'lib/prisma'
import { nonNull, objectType, stringArg } from 'nexus'

const Queries = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('patterns', {
      type: 'Pattern',
      resolve: () => {
        return prisma.pattern.findMany({})
      }
    })
    t.field('pattern', {
      type: 'Pattern',
      args: { id: nonNull(stringArg()) },
      resolve: (_, args) => {
        return prisma.pattern.findUnique({
          where: {
            id: Number(args.id)
          }
        })
      }
    })
  }
})

export default Queries
