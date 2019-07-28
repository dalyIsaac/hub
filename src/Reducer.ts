import reduceReducers from "reduce-reducers";
import subjectReducer, { initialSubjectState } from "./subject/Reducer";
import { SubjectState } from "./subject/model/Subject";
import { ViewState } from "./views/model/View";
import viewReducer, { initialViewState } from "./views/Reducer";

export interface State {
  readonly subjects: SubjectState;
  readonly views: ViewState;
}

const getInitialState = (): State => ({
  subjects: initialSubjectState(),
  views: initialViewState(),
});

const initialReducer = (state: State = getInitialState()): State => {
  return state;
};

export default reduceReducers(initialReducer, subjectReducer, viewReducer);
