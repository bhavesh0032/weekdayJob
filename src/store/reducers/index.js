import { combineReducers } from "redux";
import { jobReducer, jobs } from "./jobReducer";

export const rootReducer = combineReducers({
jobs: jobReducer
})