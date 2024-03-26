// userActions.ts
import { SET_USER_DATA, CLEAR_USER_DATA } from './userActionTypes';

export const setUserData = (userData: any) => ({
  type: SET_USER_DATA as typeof SET_USER_DATA,
  payload: userData,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA as typeof CLEAR_USER_DATA,
});
