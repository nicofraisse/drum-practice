import { objectType } from 'nexus'

const Pattern = objectType({
  name: 'Pattern',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('description')
    t.string('score')
  }
})

export default [Pattern]
