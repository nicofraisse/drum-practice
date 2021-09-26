/* eslint-disable no-console */

import { Prisma } from '@prisma/client'

import prisma from '../lib/prisma'

const patterns: Prisma.PatternCreateInput[] = [
  {
    name: 'Paradiddle',
    score: 'rlrrlrll'
  },
  {
    name: 'Double Stroke',
    score: 'rrllrrll'
  },
  {
    name: 'Swing Cymbal',
    score: 'x..xxx.xx',
    description: 'Classic, play relaxed!'
  },
  {
    name: 'Basic',
    score: '....x...'
  }
]

async function main() {
  try {
    await prisma.pattern.deleteMany({})
  } finally {
    for (const data of patterns) {
      await prisma.pattern.create({ data })
      console.log('Created pattern:', data.score)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
