import { TodoStatus } from '@/types/Types'

const StatusCapsule = (props: any) => {
  const { status } = props

  return (
    <span
      className={`font-mono py-1 px-3 rounded-full text-xs ${
        status == TodoStatus.Canceled && 'bg-purple-200 text-purple-600'
      } ${status == TodoStatus.Complete && 'bg-blue-200 text-blue-600'}
                  ${status == TodoStatus.New && 'bg-green-200 text-green-600'}
                  ${status == TodoStatus.Canceled && 'bg-red-200 text-red-600'}
                  ${status == TodoStatus.Canceled && 'bg-yellow-200 text-yellow-600'}
                  `}
    >
      {status}
    </span>
  )
}
export default StatusCapsule
