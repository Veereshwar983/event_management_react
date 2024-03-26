// userReducer.ts
import { SET_USER_DATA, CLEAR_USER_DATA } from '../actions/userActionTypes';

interface UserState {
  userData: any;
}

const initialState: UserState = {
  userData: null,
};

const userReducer = (state: UserState = initialState, action: any) => {
    console.log('actionnnn', action.payload)
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export default userReducer;

