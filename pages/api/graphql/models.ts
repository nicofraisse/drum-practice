import prisma from 'lib/prisma'
import { objectType } from 'nexus'

const Pattern = objectType({
  name: 'Pattern',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.string('score')
    t.int('bestTempo')
  }
})

const Record = objectType({
  name: 'Record',
  definition(t) {
    t.int('id')
    t.int('tempo')
    t.int('rating')
    t.int('patternId')
    t.nonNull.field('createdAt', {
      type: 'DateTime'
    })
    t.nullable.field('pattern', {
      type: 'Pattern',
      resolve: (parent) =>
        prisma.record
          .findUnique({
            where: { id: Number(parent.id) }
          })
          .pattern()
    })
  }
})

export default [Pattern, Record]
