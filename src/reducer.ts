import { combineReducers } from "redux";
import subjectReducer from "./subject/reducer";
import { SubjectState } from "./subject/model";

export interface State {
  subjects: SubjectState;
}

export default combineReducers({
  subjects: subjectReducer
});
