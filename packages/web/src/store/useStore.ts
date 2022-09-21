import create from 'zustand';

export type User = {
  name?: string | null;
  email?: string | null;
  _id?: string;
};

type State = {
  user?: User | undefined;
  setUser: (user?: User) => void;
};

export const useStore = create<State>(set => ({
  user: undefined,
  setUser: (user?: User) => {
    set(state => ({ ...state, user }));
  },
}));
