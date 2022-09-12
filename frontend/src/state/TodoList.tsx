import { Todo } from '@/types';
import { atom } from 'recoil'

export const TodoList = atom<Todo[]>({
  key: "todoListAtom",
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((e) => {
        console.debug("Current todo tasks", e);
      });
    }
  ]
});