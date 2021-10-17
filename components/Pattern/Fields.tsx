import Field from 'components/Field'
const Fields = ({ isMain }) => {
  return (
    <div className="bg-gray-200 p-3 my-3">
      <div className="text-lg font-bold mb-2">
        {isMain ? 'Main Pattern' : 'Create Variation'}
      </div>
      <Field type="text" name="name" />
      <Field type="textArea" name="description" />
      <Field type="text" name="score" />
      <Field type="number" name="startTempo" label="Start tempo (bpm)" />
      <Field type="number" name="goalTempo" label="Goal tempo (bpm)" />
      <div className="text-sm text-gray-500 bg-gray-100 border-gray-300 border rounded p-2">
        Note: Don&apos;t create the pattern too quickly! Sit on your drums, and
        try to come up with a start tempo that anyone can begin with, and set a
        goal tempo that you think would be challenging to acheive but would
        still sound human and groovy.
      </div>
    </div>
  )
}

export default Fields
