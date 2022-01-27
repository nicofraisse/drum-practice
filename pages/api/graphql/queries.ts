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
    t.list.field('exercises', {
      type: 'Exercise',
      resolve: () => {
        return prisma.exercise.findMany({})
      }
    })
    t.field('exercise', {
      type: 'Exercise',
      args: { id: nonNull(stringArg()) },
      resolve: (_, args) => {
        return prisma.exercise.findUnique({
          where: {
            id: Number(args.id)
          }
        })
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
    t.list.field('records', {
      type: 'Record',
      args: { patternId: nonNull(stringArg()) },
      resolve: (_, args) => {
        return prisma.record.findMany({
          where: {
            patternId: Number(args.patternId)
          }
        })
      }
    })
  }
})

export default Queries
