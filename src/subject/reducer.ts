import produce from "immer";
import { SubjectState } from "./model";
import { Action } from "redux";

const subjectReducer = (state: SubjectState = {}, action: Action) =>
  produce(state, draftState => {
    return draftState;
  });

export default subjectReducer;
