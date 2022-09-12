import { atom } from 'recoil'

export const LoggedIn = atom({
  key: "loggedInAtom",
  default: false,
});