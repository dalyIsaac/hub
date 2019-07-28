import { ViewState } from "./model/View";
import { Action } from "redux";
import produce from "immer";

const getInitialState = (): ViewState => ({
  dict: {},
  order: [],
});

const viewReducer = (
  state: ViewState = getInitialState(),
  action: Action,
): ViewState =>
  produce(
    state,
    (draftState): ViewState => {
      return draftState;
    },
  );

export default viewReducer;
