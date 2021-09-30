import PatternCard from 'components/Pattern/Card'

const PatternList = ({ patterns }) => {
  return patterns.map((p: any) => (
    <PatternCard key={p.id} pattern={p} collapsed />
  ))
}

export default PatternList
