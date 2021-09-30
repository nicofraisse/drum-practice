import { useMutation } from '@apollo/client'
import PatternCard from 'components/Pattern/Card'
import { DELETE_PATTERN } from 'lib/gql/pattern.gql'
import { toast } from 'react-toastify'

const PatternList = ({ data, refetchQueries }) => {
  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries
  })
  const handleDeletePattern = (patternId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this pattern? All corresponding records will be deleted.'
      )
    ) {
      deletePattern({ variables: { patternId } })
        .then((data) => toast.success('success', data))
        .catch((e) => {
          toast.error('error', e.message)
          console.error('e', e.message)
        })
    }
  }
  return data?.patterns.map((p: any) => (
    <PatternCard key={p.id} data={p} handleDelete={handleDeletePattern} />
  ))
}

export default PatternList
