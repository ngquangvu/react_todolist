import { TodoStatus } from '@/types'

const StatusCapsule = (props: any) => {
  const { status } = props

  return (
    <span
      className={`font-mono inline-box py-1 px-3 rounded-full text-xs
        ${status == TodoStatus.NA && 'bg-slate-200 text-slate-600'}
        ${status == TodoStatus.New && 'bg-purple-200 text-purple-600'}
        ${status == TodoStatus.InProgress && 'bg-blue-200 text-blue-600'}
        ${status == TodoStatus.Pending && 'bg-yellow-200 text-yellow-600'}
        ${status == TodoStatus.Canceled && 'bg-red-200 text-red-600'}
        ${status == TodoStatus.Complete && 'bg-green-200 text-green-600'}
      `}
    >
      {status}
    </span>
  )
}
export default StatusCapsule
