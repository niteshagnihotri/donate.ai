import { createContext, useContext, useReducer, useMemo } from "react";
import { initialState, reducer } from '../reducer/reducer';

export const UserContext = createContext(false); 

export function AppWrapper({children}){
    
    const [state , dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
     }, [state, dispatch]);
     
     return (
        <UserContext.Provider value={contextValue}>
           {children}
        </UserContext.Provider>
     );
}
