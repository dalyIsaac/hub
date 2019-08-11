import reduceReducers from "reduce-reducers";
import subjectReducer, { initialSubjectState } from "./model/Subject/Reducer";
import { SubjectState } from "./model/Subject";
import { ViewState } from "./model/Views";
import viewReducer, { initialViewState } from "./model/Views/Reducer";

export interface State {
  subjects: SubjectState;
  views: ViewState;
}

const getInitialState = (): State => ({
  subjects: initialSubjectState(),
  views: initialViewState(),
});

const initialReducer = (state: State = getInitialState()): State => {
  return state;
};

export default reduceReducers(initialReducer, subjectReducer, viewReducer);
