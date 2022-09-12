import { atom } from 'recoil'

export const PerPage = atom({
  key: "perPageAtom",
  default: 10,
});