const StatusCapsule = (props: any) => {
  const { status, statusID } = props

  return (
    <span
      className={`font-mono py-1 px-3 rounded-full text-xs ${statusID == 1 && 'bg-purple-200 text-purple-600'} ${
        statusID == 2 && 'bg-blue-200 text-blue-600'
      }
                  ${statusID == 3 && 'bg-green-200 text-green-600'}
                  ${statusID == 4 && 'bg-red-200 text-red-600'}
                  ${statusID == 5 && 'bg-yellow-200 text-yellow-600'}
                  `}
    >
      {status}
    </span>
  )
}
export default StatusCapsule
