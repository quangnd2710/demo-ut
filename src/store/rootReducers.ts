import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import dogReducer from '@/pages/DogsWithRedux/dogSlice'
import { history } from "@/utils/history";

const rootReducer = combineReducers({
  router: connectRouter(history),
  dogs: dogReducer
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
