import { create } from 'zustand'

type User = {
    id: string,
    name: string,
    email: string,
}

interface UserState {
    id: string,
    name: string,
    email: string,
    setUser: (user: any) => void,
  }

export const userStore = create<UserState>((set) => ({
  id: '',
  name: '',
  email: '',
  setUser: (user: User) => set(() => user),
}))