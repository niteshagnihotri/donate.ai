
export const initialState = false;

export const reducer = (state, action) => {

  switch(action.type){
    case "LOGIN": 
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case "LOGOUT":
      localStorage.clear();
      return action.payload;
    case "INIT_USER":
      return action.payload;
    default :
      return state;
  }

};
  
  
  