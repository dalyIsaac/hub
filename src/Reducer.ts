import { combineReducers } from "redux";
import subjectReducer from "./subject/Reducer";
import { SubjectState } from "./subject/model/Subject";
import { ViewState } from "./views/model/View";
import viewReducer from "./views/Reducer";

export interface State {
  subjects: SubjectState;
  views: ViewState;
}

export default combineReducers({
  subjects: subjectReducer,
  views: viewReducer,
});
