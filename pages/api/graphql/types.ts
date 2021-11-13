import prisma from 'lib/prisma'
import { objectType } from 'nexus'

const Exercise = objectType({
  name: 'Exercise',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.list.field('patterns', {
      type: 'Pattern',
      resolve: (parent) =>
        prisma.exercise
          .findUnique({
            where: { id: Number(parent.id) }
          })
          .patterns()
    })
  }
})

const Pattern = objectType({
  name: 'Pattern',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.string('score')
    t.int('fastestTempo')
    t.int('bestTempo')
    t.int('fastestTempo')
    t.int('goalTempo')
    t.int('startTempo')
    t.nullable.field('exercise', {
      type: 'Exercise',
      resolve: (parent) =>
        prisma.pattern
          .findUnique({
            where: { id: Number(parent.id) }
          })
          .exercise()
    })
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

export default [Pattern, Exercise, Record]
