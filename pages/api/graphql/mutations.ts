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
    t.field('createRecord', {
      type: 'Record',
      args: {
        tempo: nonNull(intArg()),
        rating: nonNull(intArg()),
        patternId: nonNull(stringArg())
      },
      resolve: (_, { tempo, rating, patternId }) => {
        return prisma.record.create({
          data: {
            tempo,
            rating,
            patternId: Number(patternId)
          }
        })
      }
    })
    t.nullable.field('deleteRecord', {
      type: 'Record',
      args: {
        recordId: nonNull(intArg())
      },
      resolve: (_, { recordId }) => {
        return prisma.record.delete({
          where: { id: Number(recordId) }
        })
      }
    })
  }
})

export default Mutations
