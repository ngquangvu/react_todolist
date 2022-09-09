import { TodoPriority, TodoStatus } from '@/types'

const PriorityCapsule = (props: any) => {
  const { status, priority } = props

  return (
    <span
      className={`relative inline-box font-mono py-1 px-3 text-xs
        ${(priority === TodoPriority.High && (status !== TodoStatus.Complete && status !== TodoStatus.NA && status !== TodoStatus.Canceled)) && ' text-red-600'}
        ${priority === TodoPriority.Medium && ' text-black-700'}
        ${priority === TodoPriority.Low && ' text-back-700'}
      `}
    >
      {(priority === TodoPriority.High && (status !== TodoStatus.Complete && status !== TodoStatus.NA && status !== TodoStatus.Canceled))? (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
          <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>
        </>
      ) : (
        <></>
      )}

      {priority}
    </span>
  )
}
export default PriorityCapsule
