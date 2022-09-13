import { atom } from 'recoil'

import type { Todo } from '@/types'

export const TodoList = atom<Todo[]>({
  key: 'todoListAtom',
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((e) => {
        console.debug('Current todo tasks', e)
      })
    }
  ]
})
