import { combineReducers } from "redux";
import subjectReducer from "./subject/Reducer";
import { SubjectState } from "./subject/model/Subject";

export interface State {
  subjects: SubjectState;
}

export default combineReducers({
  subjects: subjectReducer,
});
