import prisma from 'lib/prisma'
import { intArg, nonNull, objectType, stringArg } from 'nexus'

const Mutations = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createExercise', {
      type: 'Exercise',
      args: {
        name: stringArg(),
        description: stringArg()
      },
      resolve: (_, { name, description }) => {
        return prisma.exercise.create({
          data: {
            name,
            description
          }
        })
      }
    })
    t.field('createPattern', {
      type: 'Pattern',
      args: {
        name: stringArg(),
        score: stringArg(),
        description: stringArg(),
        exerciseId: intArg(),
        goalTempo: intArg(),
        startTempo: intArg()
      },
      resolve: (
        _,
        { name, score, description, exerciseId, startTempo, goalTempo }
      ) => {
        return prisma.pattern.create({
          data: {
            name,
            score,
            description,
            exerciseId,
            startTempo,
            goalTempo
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
          where: { id: patternId }
        })
      }
    })
    t.nullable.field('deleteExercise', {
      type: 'Exercise',
      args: {
        exerciseId: nonNull(intArg())
      },
      resolve: (_, { exerciseId }) => {
        return prisma.exercise.delete({
          where: { id: exerciseId }
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
      resolve: async (_, { tempo, rating, patternId }) => {
        const pattern = await prisma.pattern.findUnique({
          where: {
            id: Number(patternId)
          }
        })
        // Todo: Isn't there a way to directly update the previous variable like pattern.update
        if (rating === 3 && (!pattern.bestTempo || pattern.bestTempo < tempo)) {
          await prisma.pattern.update({
            where: {
              id: Number(patternId)
            },
            data: {
              bestTempo: tempo
            }
          })
        }
        if (!pattern.fastestTempo || pattern.fastestTempo < tempo) {
          await prisma.pattern.update({
            where: {
              id: Number(patternId)
            },
            data: {
              fastestTempo: tempo
            }
          })
        }
        return prisma.record.create({
          data: {
            tempo,
            rating,
            patternId: Number(patternId)
          }
        })
      }
    })
    t.nullable.field('updatePattern', {
      type: 'Pattern',
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        description: stringArg(),
        score: stringArg(),
        tempo: intArg(),
        startTempo: intArg(),
        goalTempo: intArg()
      },
      resolve: (
        _,
        { id, tempo, name, score, startTempo, goalTempo, description }
      ) => {
        return prisma.pattern.update({
          where: { id: Number(id) },
          data: {
            bestTempo: tempo,
            name,
            score,
            startTempo,
            goalTempo,
            description
          }
        })
      }
    })
    t.nullable.field('updateExercise', {
      type: 'Exercise',
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        description: stringArg()
      },
      resolve: (_, { id, name, description }) => {
        return prisma.exercise.update({
          where: { id: Number(id) },
          data: { name, description }
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
