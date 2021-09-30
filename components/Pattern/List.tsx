import PatternCard from 'components/Pattern/Card'

const PatternList = ({ data, handleDelete }) => {
  return data?.patterns.map((p: any) => (
    <PatternCard key={p.id} data={p} handleDelete={handleDelete} />
  ))
}

export default PatternList
