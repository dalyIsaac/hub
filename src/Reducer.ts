import reduceReducers from "reduce-reducers";
import subjectReducer, { initialSubjectState } from "./model/Subject/Reducer";
import { SubjectState } from "./model/Subject";
import { ViewState } from "./model/Views";
import viewReducer, { initialViewState } from "./model/Views/Reducer";
import orderReducer from "./model/Order/Reducer";
import { DisplayState } from "./model/Display";
import displayReducer, { initialDisplayState } from "./model/Display/Reducer";

export interface State {
  display: DisplayState;
  subjects: SubjectState;
  views: ViewState;
}

const getInitialState = (): State => ({
  display: initialDisplayState(),
  subjects: initialSubjectState(),
  views: initialViewState(),
});

const initialReducer = (state: State = getInitialState()): State => {
  return state;
};

export default reduceReducers(
  initialReducer,
  subjectReducer,
  viewReducer,
  orderReducer,
  displayReducer,
);
