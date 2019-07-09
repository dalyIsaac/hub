import { combineReducers } from "redux";
import subjectReducer from "./subject/reducer";

export default combineReducers({
  subject: subjectReducer
});
