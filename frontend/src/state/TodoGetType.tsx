import { atom } from 'recoil'

export const TodoGetType = atom({
  key: 'todoGetTypeAtom',
  default: 'all' // all | scheduled | onlytrashed
})
