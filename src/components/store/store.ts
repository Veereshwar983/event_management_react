// store.ts
import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';

export interface RootState {
  user: ReturnType<typeof userReducer>;
}

const rootReducer = combineReducers<RootState>({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
