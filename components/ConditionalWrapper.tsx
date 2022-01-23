const ConditionalWrapper = ({ wrapper, condition, children }) => {
  if (!children) return null
  if (condition) return wrapper(children)
  return children
}

export default ConditionalWrapper
