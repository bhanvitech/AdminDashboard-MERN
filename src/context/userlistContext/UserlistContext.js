import UserlistReducer from './UserlistReducer'
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: [],
  isFetching: false,
  error: false,
};

export const UserlistContext = createContext(INITIAL_STATE);

export const UserlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserlistReducer, INITIAL_STATE);

  return (
    <UserlistContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserlistContext.Provider>
  );
};