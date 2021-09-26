import prisma from 'lib/prisma'
import { objectType } from 'nexus'

const Queries = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('patterns', {
      type: 'Pattern',
      resolve: () => {
        return prisma.pattern.findMany({})
      }
    })
  }
})

export default Queries
