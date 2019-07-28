import { ViewState } from "./model/View";
import { Action } from "redux";
import produce from "immer";

const viewReducer = (state: ViewState = {}, action: Action): ViewState =>
  produce(
    state,
    (draftState): ViewState => {
      return draftState;
    },
  );

export default viewReducer;
