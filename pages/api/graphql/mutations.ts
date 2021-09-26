import prisma from 'lib/prisma'
import { intArg, nonNull, objectType, stringArg } from 'nexus'

const Mutations = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createPattern', {
      type: 'Pattern',
      args: {
        name: nonNull(stringArg()),
        score: nonNull(stringArg()),
        description: stringArg()
      },
      resolve: (_, { name, score, description }) => {
        return prisma.pattern.create({
          data: {
            name,
            score,
            description
          }
        })
      }
    })
    t.nullable.field('deletePattern', {
      type: 'Pattern',
      args: {
        patternId: nonNull(intArg())
      },
      resolve: (_, { patternId }) => {
        return prisma.pattern.delete({
          where: { id: Number(patternId) }
        })
      }
    })
  }
})

export default Mutations
