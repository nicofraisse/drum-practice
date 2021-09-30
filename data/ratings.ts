export const ratings = [
  {
    mark: 0,
    title: 'Failed',
    description: 'You did not succeed in playing a full minute of the riff',
    color: 'bg-blue-200',
    increment: -2
  },
  {
    mark: 1,
    title: 'Barely made it (major mistakes)',
    description: 'You managed to play the full minute with major mistakes',
    color: 'red-100',
    increment: -1
  },
  {
    mark: 2,
    title: 'Decent perfomance (Resistance point)',
    description: 'You managed to play the full minute with minor mistakes',
    color: 'yellow-200',
    increment: 0
  },
  {
    mark: 3,
    title: 'Perfect',
    description:
      'You managed to play the full minute with no noticable mistakes',
    color: 'green-200',
    increment: +1
  }
]
