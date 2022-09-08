import { createContext, useReducer } from "react";

const initialState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext();

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
      break;
    case "RESET_SEARCH":
      return initialState;
      break;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initialState);
  console.log(state);
  return (
    <SearchContext.Provider
      value={{
        city: state.destination,
        dates: state.date,
        options: state.option,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
